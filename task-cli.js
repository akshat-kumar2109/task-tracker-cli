#!/usr/bin/env node

import { exec } from "child_process";

// Get the command and arguments from the user input
const args = process.argv.slice(2);

// Construct the command to pass to index.js
const command = `node index.js ${args.join(" ")}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});
