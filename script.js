
let votes = {
    Rahul: 0,
    Aman: 0,
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

    document.getElementById("r").innerText = votes.Rahul;
    document.getElementById("a").innerText = votes.Aman;
    document.getElementById("ro").innerText = votes.Rohit;

    document.getElementById("message").innerText =
        "Vote Successfully Submitted!";

}
