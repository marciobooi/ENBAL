const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const fuzzy = FuzzySet(Object.keys(responses));
const conversationHistory = [];
const inputInitHeight = userInput.scrollHeight;


function addMessage(message, sender) {
    const chatbox = document.querySelector('.chatbox'); // Get the chatbox element
    const messageElement = document.createElement('li');
    const messageText = document.createElement('p');
    const icon = document.createElement('span'); // Correct the spelling
    const buttonLineChart = document.createElement('button'); // Correct the spelling
    const buttonBarChart = document.createElement('button'); // Correct the spelling

    // Determine the sender class based on the 'sender' argument
    const senderClass = sender === 'user' ? 'outgoing' : 'incoming';

    icon.className = 'material-symbols-outlined'; // Set the class name correctly
    messageElement.className = `chat ${senderClass}`;

    if (sender === 'bot') {
        icon.innerText = 'smart_toy'; // Use innerText to set the icon's content
        messageText.innerHTML = '<div class="dot-pulse"></div>'; // Create a dot carousel
        messageElement.appendChild(icon); // Append the icon to the messageElement
        messageElement.appendChild(messageText);
        chatbox.appendChild(messageElement);

        const fuelCode = message.match(/Fuel code: (.+)$/);
        if (fuelCode) { 
            const fuel = fuelCode[1]
            buttonLineChart.innerHTML = "Evolution over time chart"
            buttonLineChart.id = fuel
            buttonLineChart.className = 'suggestion';
            buttonLineChart.onclick = () => openLineChart(fuel);
            chatbox.appendChild(buttonLineChart);
            buttonBarChart.innerHTML = "Compare countries chart"
            buttonBarChart.id = fuel
            buttonBarChart.className = 'suggestion';
            buttonBarChart.onclick = () => openBarChart(fuel);
            chatbox.appendChild(buttonBarChart);
        }

        const dotCarousel = messageText.querySelector('.dot-carousel');
        // Add a CSS class to start the dot carousel animation
        setTimeout(() => {
           
            if (dotCarousel) {
                dotCarousel.classList.add('animate');
            }
        }, 1000);
        
        // Set a timeout to replace the dots with the actual message
        setTimeout(() => {
            messageText.innerHTML = message;
            chatbox.scrollTop = chatbox.scrollHeight;
        }, 1000); // Adjust the duration as needed
    } else {
        messageText.innerText = message;
        messageElement.appendChild(icon); // Append the icon to the messageElement
        messageElement.appendChild(messageText);
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }
    
}




function processKeyword(keyword) {
    const doc = nlp(keyword.toLowerCase());
    
    // Remove stopwords
    doc.remove(stopwords.join(' '));

    // Get the root of the sentence
    const root = doc.match('#Root');

    if (root.text() === 'what is') {
        const topic = root.after('what is').out('text').trim();
        const topicExactMatch = responses[topic];
        if (topicExactMatch) {
            addMessage(topicExactMatch.join('\n'), 'bot');
        } else {
            addMessage(`I'm sorry, I don't have information on "${topic}".`, 'bot');
        }
    } else {
        const closestMatches = fuzzy.get(keyword, null, 0.4);
        if (closestMatches && closestMatches.length > 0) {
            const closestMatch = closestMatches[0][1];
            addMessage(responses[closestMatch].join('\n'), 'bot');
        } else {
            addMessage("I'm sorry, I don't understand that. Please try rephrasing your question.", 'bot');
        }
    }
}

function processKeywords(keywords) {
    for (const keyword of keywords) {
        processKeyword(keyword);
    }
}

function handleHelpCommand() {
    const helpMessage = "You can interact with this chatbot by typing keywords or questions about energy sources, such as 'renewable energy' or 'coal'. " +
        "If you need assistance or have questions, feel free to ask. You can also use the 'help' command to get this message.";
    addMessage(helpMessage, "bot");
}

function handleCustomResponse(customKeyword, customResponse) {
    responses[customKeyword.toLowerCase()] = [customResponse];
    addMessage(`I've added a custom response for '${customKeyword}'.`, "bot");
}

function handlePersonalization(name) {
    addMessage(`Hello, ${name}! How can I assist you today?`, "bot");
}

function handleSuggestionClick(suggestion) {
    // addMessage(`You clicked on: ${suggestion}`, 'bot');
    processKeyword(suggestion);
}

// renewable

function addSuggestion(suggestions) {

    const chatItem = document.createElement('li');
    chatItem.className = 'chat incoming';

    const suggestionContainer = document.createElement('div');
    suggestionContainer.className = 'suggestionContainer';

    const innerDiv = document.createElement('div');

    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined';
    icon.innerText = 'smart_toy'

    const messageText = document.createElement('p');
    messageText.className = 'message-text';
    messageText.innerText = 'Not found in my data, but I found the following related subjects:';

    const suggestionButtons = document.createElement('div');
    suggestionButtons.className = 'suggestion-container';

    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('button');
        suggestionElement.className = 'suggestion';
        suggestionElement.innerText = suggestion;
        suggestionElement.onclick = () => handleSuggestionClick(suggestion);
        suggestionButtons.appendChild(suggestionElement);
    });

    chatItem.appendChild(suggestionContainer);
    suggestionContainer.appendChild(innerDiv);
    innerDiv.appendChild(icon);
    innerDiv.appendChild(messageText);
    suggestionContainer.appendChild(suggestionButtons);

    chatbox.appendChild(chatItem);
    chatbox.scrollTop = chatbox.scrollHeight;
}




function handleConversationHistory() {
    if (conversationHistory.length > 0) {
        addMessage("Here's the history of our conversation:");
        conversationHistory.forEach((message, index) => {
            addMessage(`${index + 1}. ${message}`, "bot");
        });
    } else {
        addMessage("Our conversation history is empty.", "bot");
    }
}

function handleLanguageSupport(language) {
    addMessage(`I'm sorry, I don't currently support the ${language} language. I primarily understand English.`, "bot");
}



function handleGreeting(greeting) {
    if (greetings.includes(greeting.toLowerCase())) {
        const responses = [
            "Hello! How can I assist you today?",
            "Hi there! How can I help you?",
            "Hey! What can I do for you?",
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, "bot");
        return true;
    }
    return false;
}


function sendMessage(event) {
    if (event.key === "Enter") {
        const userMessage = userInput.value;
        conversationHistory.push(userMessage); // Add user's message to history
        addMessage(userMessage, "user");
        userInput.value = "";

        const keywords = userMessage.split(" ").filter(Boolean);

        // Filter the keywords to remove stopwords
        const filteredKeywords = keywords.filter(word => !stopwords.includes(word.toLowerCase()));

        if (filteredKeywords.length === 0) {
            handleHelpCommand(); // If the user doesn't provide keywords, offer help
        } else if (filteredKeywords[0].toLowerCase() === "help") {
            handleHelpCommand(); // If the user specifically asks for help
        } else if (filteredKeywords[0].toLowerCase() === "history") {
            handleConversationHistory(); // Show conversation history
        } else if (filteredKeywords[0].toLowerCase() === "personalize") {
            const name = filteredKeywords.slice(1).join(" "); // Extract the user's name
            handlePersonalization(name); // Personalize the chat
        } else if (filteredKeywords[0].toLowerCase() === "language") {
            const language = filteredKeywords[1]; // Extract the language
            handleLanguageSupport(language); // Inform about language support
        } else if (filteredKeywords[0].toLowerCase() === "custom") {
            // Allow users to define custom responses, e.g., "custom keyword response"
            const customKeyword = filteredKeywords[1];
            const customResponse = filteredKeywords.slice(2).join(" ");
            handleCustomResponse(customKeyword, customResponse);
        } else if (greetings.includes(userMessage.toLowerCase())) {
            handleGreeting(userMessage);
        } else {
            // Check for exact matches in the responses dictionary
            const filteredSearchTerm = filteredKeywords.join(" ");
            const exactMatch = responses[filteredSearchTerm];

            if (exactMatch) {
                addMessage(exactMatch.join('\n'), "bot");
            } else {
                // Check for synonyms
                let primaryTerm;              

                for (const [term, synonyms] of Object.entries(synonym)) {                   
                    if (synonyms.includes(filteredSearchTerm)) {
                        primaryTerm = term;
                        break;
                    }
                }

                if (primaryTerm) {
                    addMessage(responses[primaryTerm].join('\n'), "bot");
                } else {

               


          
                    const combinations = generateCombinations(keywords);
                    let suggestions = [];
                    let foundMatch = false;
                    
                    for (const combination of combinations) {
                        if (responses.hasOwnProperty(combination)) {
                            suggestions.push(responses[combination]);
                            console.log(combination);
                            foundMatch = true;
                        }
                    }


          

             







                    // const suggestions = Object.keys(responses).filter(keyword => {
                    //     const suggestionKeywords = keyword.split(" ");
                    //     return keywords.some(userKeyword => suggestionKeywords.includes(userKeyword));
                    // });

                    if (suggestions.length > 0) {
                        addSuggestion(suggestions);
                    } else {
                        addMessage("I'm sorry, I don't understand that. Please try rephrasing your question.", 'bot');
                    }
                }
            }
        }
    }
}



function generateCombinations(words) {
    const results = [];
  
    function backtrack(start, currentCombination) {
      if (currentCombination.length > 0) {
        results.push(currentCombination.join(" "));
      }
  
      for (let i = start; i < words.length; i++) {
        currentCombination.push(words[i]);
        backtrack(i + 1, currentCombination);
        currentCombination.pop();
      }
    }
  
    backtrack(0, []);
  
    return results;
  }
  
  





addMessage("Hello! How can I assist you today? Type 'help' for assistance.", "bot");


