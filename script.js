
let votes = {
    Ram: 0,
    Shyam: 0,
    Rohit: 0
};

let voted = [];

function vote(candidate) {

    let name = document.getElementById("name").value;
    let voter = document.getElementById("voter").value;

    if (name === "" || voter === "") {
        alert("Please enter your Name and Voter ID!");
        return;
    }

    if (voted.includes(voter)) {
        alert("You have already voted!");
        return;
    }

    votes[candidate]++;
    voted.push(voter);

    document.getElementById("r").innerText = votes.Ram;
    document.getElementById("a").innerText = votes.Shyam;
    document.getElementById("ro").innerText = votes.Rohit;

    document.getElementById("message").innerText =
        "Vote Successfully Submitted!";

}
