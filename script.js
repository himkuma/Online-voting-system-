"use strict";

// Online Voting System - Educational Demo

const CANDIDATES = [
  {
    id: "candidate1",
    name: "Rahul Sharma",
    party: "Progress Party",
    symbol: "🌅"
  },
  {
    id: "candidate2",
    name: "Priya Verma",
    party: "Unity Party",
    symbol: "🌳"
  },
  {
    id: "candidate3",
    name: "Aman Singh",
    party: "Development Party",
    symbol: "⭐"
  }
];

const USERS_KEY = "ovs_demo_users_v1";
const VOTES_KEY = "ovs_demo_votes_v1";
const SESSION_KEY = "ovs_demo_session_v1";

let users = readStorage(USERS_KEY, {});
let votes = readStorage(VOTES_KEY, {});
let currentUserId = localStorage.getItem(SESSION_KEY) || "";

function readStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveData() {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}

function getUser() {
  return users[currentUserId] || null;
}

function setMessage(id, text, success = false) {
  const element = document.getElementById(id);
  element.textContent = text;
  element.style.color = success ? "#16803c" : "#c62828";
}

// Switch between Register and Login

function showAuth(mode) {
  const isRegister = mode === "register";

  document.getElementById("registerForm").hidden = !isRegister;
  document.getElementById("loginForm").hidden = isRegister;

  document.getElementById("registerTab")
    .classList.toggle("active", isRegister);

  document.getElementById("loginTab")
    .classList.toggle("active", !isRegister);

  setMessage("authMessage", "");
}

// Register a demo voter

document.getElementById("registerForm").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();

    const name = document.getElementById("regName")
      .value.trim();

    const voterId = document.getElementById("regId")
      .value.trim().toLowerCase();

    const password = document.getElementById("regPassword")
      .value;

    if (!name || !voterId || !password) {
      setMessage("authMessage", "Please fill in all fields.");
      return;
    }

    if (Object.prototype.hasOwnProperty.call(users, voterId)) {
      setMessage(
        "authMessage",
        "This demo Voter ID is already registered. Please log in."
      );
      return;
    }

    // Demo only: real applications must use a secure backend
    // and properly hashed passwords.
    users[voterId] = {
      name: name,
      password: password,
      votedFor: null
    };

    try {
      saveData();
    } catch (error) {
      delete users[voterId];
      setMessage("authMessage", "Could not save account data.");
      return;
    }

    currentUserId = voterId;
    localStorage.setItem(SESSION_KEY, voterId);

    document.getElementById("registerForm").reset();

    setMessage(
      "authMessage",
      "Registration successful! You are now logged in.",
      true
    );

    updateUI();
  }
);

// Log in an existing demo voter

document.getElementById("loginForm").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();

    const voterId = document.getElementById("loginId")
      .value.trim().toLowerCase();

    const password = document.getElementById("loginPassword")
      .value;

    const user = users[voterId];

    if (!user || user.password !== password) {
      setMessage(
        "authMessage",
        "Invalid Voter ID or password."
      );
      return;
    }

    currentUserId = voterId;
    localStorage.setItem(SESSION_KEY, voterId);

    document.getElementById("loginForm").reset();

    setMessage("authMessage", "Login successful!", true);
    updateUI();
  }
);

// Log out

function logout() {
  currentUserId = "";
  localStorage.removeItem(SESSION_KEY);

  document.getElementById
}