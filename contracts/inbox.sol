contract inbox
{
    string public message;
    constructor (string memory initial_message) {message = initial_message;}
    function set_message (string calldata new_message) public payable {message = new_message;}
}
