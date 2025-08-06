// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EthTrust {
    address public controller;
    uint256 public totalMembers;
    
    struct Member {
        bool isActive;
        uint256 limit;
        uint256 used;
    }
    
    mapping(address => Member) public members;
    
    event MemberAdded(address indexed member, uint256 limit);
    event MemberRemoved(address indexed member);
    event LimitUpdated(address indexed member, uint256 newLimit);
    event PurchaseCompleted(address indexed member, uint256 amount);
    
    modifier onlyController() {
        require(msg.sender == controller, "Only controller can call this");
        _;
    }
    
    modifier onlyMember() {
        require(members[msg.sender].isActive, "Only members can call this");
        _;
    }
    
    constructor() {
        controller = msg.sender;
    }
    
    function addMember(address _member, uint256 _limit) external onlyController {
        require(_member != address(0), "Invalid address");
        require(!members[_member].isActive, "Member already exists");
        
        members[_member] = Member({
            isActive: true,
            limit: _limit,
            used: 0
        });
        
        totalMembers++;
        emit MemberAdded(_member, _limit);
    }
    
    function removeMember(address _member) external onlyController {
        require(members[_member].isActive, "Member does not exist");
        
        delete members[_member];
        totalMembers--;
        emit MemberRemoved(_member);
    }
    
    function setLimit(address _member, uint256 _newLimit) external onlyController {
        require(members[_member].isActive, "Member does not exist");
        
        members[_member].limit = _newLimit;
        emit LimitUpdated(_member, _newLimit);
    }
    
    function makePurchase(uint256 _amount) external onlyMember {
        Member storage member = members[msg.sender];
        require(member.used + _amount <= member.limit, "Amount exceeds limit");
        require(address(this).balance >= _amount, "Insufficient contract balance");
        
        member.used += _amount;
        payable(msg.sender).transfer(_amount);
        emit PurchaseCompleted(msg.sender, _amount);
    }
    
    function getMember(address _member) external view returns (bool isActive, uint256 limit, uint256 used) {
        Member memory member = members[_member];
        return (member.isActive, member.limit, member.used);
    }
    
    receive() external payable {}
}