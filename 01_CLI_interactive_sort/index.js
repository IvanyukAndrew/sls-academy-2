const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sortInput(input, sortBy) {
  let result;

  switch (sortBy) {
    case '1':
      result = input.split(' ').sort().filter(item => isNaN(item));
      break;
    case '2':
      result = input.split(' ').filter(item => !isNaN(item)).sort((a, b) => a - b);
      break;
    case '3':
      result = input.split(' ').filter(item => !isNaN(item)).sort((a, b) => b - a);
      break;
    case '4':
      result = input.split(' ').sort((a, b) => a.length - b.length);
      break;
    case '5':
      result = [...new Set(input.split(' ').filter(item => isNaN(item)))];
      break;
    case '6':
      result = [...new Set(input.split(' ').filter(item => !isNaN(item)))];
      break;
    default:
      result = 'Invalid option';
  }

  return result;
}

function getInput() {
  rl.question('Enter a few words or numbers separated by a space: ', (input) => {
    rl.question('What operation would you like to do?\n' +
                '1. Sort words alphabetically\n' +
                '2. Show numbers from lesser to greater\n' +
                '3. Show numbers from bigger to smaller\n' +
                '4. Display words in ascending order by number of letters in the word\n' +
                '5. Show only unique words\n' +
                '6. Display only unique values from the set of words and numbers entered by the user\n' +
                'Enter the option number (1-6) or "exit" to quit: ', (sortBy) => {
      if (sortBy.toLowerCase() === 'exit') {
        rl.close();
      } else {
        const sortedResult = sortInput(input, sortBy);
        console.log('Result:', sortedResult);
        getInput();
      }
    });
  });
}

getInput();
