/// Install required packages:
// npm install fs-extra inquirer --save

const fs = require('fs-extra');
const inquirer = require('inquirer');

const BnippetS_FILE_PATH = 'Bnippets.json';

async function createBnippet() {
  try {
    // Load existing Bnippets
    const Bnippets = await loadBnippets();

    // Prompt user for Bnippet details
    const BnippetDetails = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Enter Bnippet name:' },
      { type: 'editor', name: 'code', message: 'Enter Bnippet code:' },
    ]);

    // Add the new Bnippet to the list
    Bnippets.push({
      name: BnippetDetails.name,
      code: BnippetDetails.code,
    });

    // Save updated Bnippets to file
    await saveBnippets(Bnippets);

    console.log(`Bnippet '${BnippetDetails.name}' added successfully.`);
  } catch (error) {
    console.error('Error creating Bnippet:', error);
  }
}

async function listBnippets() {
  try {
    // Load existing Bnippets
    const Bnippets = await loadBnippets();

    // Display a list of available Bnippets
    Bnippets.forEach((Bnippet, index) => {
      console.log(`${index + 1}. ${Bnippet.name}`);
    });
  } catch (error) {
    console.error('Error listing Bnippets:', error);
  }
}

async function loadBnippets() {
  try {
    // Read Bnippets from file or return an empty array if the file doesn't exist
    const Bnippets = await fs.readJson(BnippetS_FILE_PATH, { throws: false }) || [];
    return Bnippets;
  } catch (error) {
    console.error('Error loading Bnippets:', error);
    return [];
  }
}

async function saveBnippets(Bnippets) {
  try {
    // Save Bnippets to file
    await fs.writeJson(BnippetS_FILE_PATH, Bnippets);
  } catch (error) {
    console.error('Error saving Bnippets:', error);
  }
}

// Example Usage:

// Uncomment and run one of the functions below
// createBnippet();
// listBnippets();
