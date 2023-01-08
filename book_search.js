/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    
    // This if statement checks if the array in JSON object is empty
    if (Array.isArray(scannedTextObj) == false || scannedTextObj.length === 0){
        var result = {
            "SearchTerm": searchTerm,
            "Results": []
        }
    }
    // This if statement checks if the dictionary in the JSON object is empty 
    else if (Object.keys(scannedTextObj[0]).length === 0){
            var result = {
                "SearchTerm": searchTerm,
                "Results": []
            }
    } 
    // This if statement checks if the search term is an empty string
    else if(searchTerm === ""){
        var result = {
            "SearchTerm": searchTerm,
            "Results": []
        }
    } else {
        var results = []

        /** The Nested for loop is using the i variable to search through the first layer of the 
         * JSON object, which are dictionary items inside of an array. The j variable is used to search
         * through the second layer of the JSON object, which are the items inside the dictionary.
         * */ 
        for(var i = 0; i < scannedTextObj.length; i++){
            // the variable content contains the values inside the key named content
            var content = scannedTextObj[i].Content

            // Loops through the items in the content key
            for (var j = 0; j < content.length; j++){
                //contentStr contains the key "text" thats found inside of content
                var contentStr = content[j]["Text"]
                var answer = {}

                /** 
                 * if searchTerm is found inside of contentStr, then we add 
                 * ISBN, Page, and Line into the answer dictionary, and then 
                 * push it onto the results array.
                 * */
                if (contentStr.includes(searchTerm)){
                    answer['ISBN'] = scannedTextObj[i].ISBN
                    answer['Page'] = content[j]["Page"]
                    answer['Line'] = content[j]["Line"]
                    results.push(answer)  
                }
            }  
        }
        
        var result = {
            "SearchTerm": searchTerm,
            "Results": results
        };
    }
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const multipleBooks = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Breath: The New Science of a Lost Art",
        "ISBN": "9780735213616",
        "Content": [
            {
                "Page": 5,
                "Line": 1,
                "Text": "Twenty-five sextillion molecules take this same voyage 18 times a minutes, 25000 times a day."
            },
            {
                "Page": 42,
                "Line": 20,
                "Text": "There's a yoga practice dedicated to manipulating the body's functions with forced breathing through the nostrils."
            }
        ] 
    }
]

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 

 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/* 1. Test that the function correctly returns the expected output when the searchTerm is found in the scannedTextObj content. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/* 2. Test that the function correctly returns the expected number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/* 3. Test that the function correctly returns the expected output when the searchTerm is not found in the scannedTextObj content. */
const test3expected = {
    "SearchTerm": "magic",
    "Results": []
}
const test3result = findSearchTermInBooks("magic", twentyLeaguesIn);
if (JSON.stringify(test3expected) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", test3expected);
    console.log("Received:", test3result);
} 

/* 4. Test that the function correctly handles case sensitivity when searching for the searchTerm within the scannedTextObj content. */
const test4expected = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}
const test4result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(test4expected) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", test4expected);
    console.log("Received:", test4result);
} 

/* 5. Test that the function correctly handles an empty scannedTextObj.*/
const test5input = [{}]
const test5expected = {
    "SearchTerm": "The",
    "Results": []
}
const test5result = findSearchTermInBooks("The", test5input);
if (JSON.stringify(test5expected) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", test5expected);
    console.log("Received:", test5result);
} 

/* 6. Test that the function correctly handles a scannedTextObj with no content property.*/
const test6input = []
const test6expected = {
    "SearchTerm": "The",
    "Results": []
}
const test6result = findSearchTermInBooks("The", test6input);
if (JSON.stringify(test6expected) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", test6expected);
    console.log("Received:", test6result);
} 

/* 7. Test that the function correctly handles a searchTerm that is an empty string or a string consisting of only whitespace characters.*/
const test7expected = {
    "SearchTerm": "",
    "Results": []
}
const test7result = findSearchTermInBooks("", multipleBooks);
if (JSON.stringify(test7expected) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", test7expected);
    console.log("Received:", test7result);
} 

/* 8. Test that the function correctly handles a searchTerm that consists of only whitespace characters.*/
const test8expected = {
    "SearchTerm": "   ",
    "Results": []
}
const test8result = findSearchTermInBooks("   ", multipleBooks);
if (JSON.stringify(test8expected) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", test8expected);
    console.log("Received:", test8result);
} 

/* 9. Test that the function correctly handles special characters in the searchTerm or scannedTextObj content.*/
const test9expected = {
    "SearchTerm": "The$",
    "Results": []
}
const test9result = findSearchTermInBooks("The$", multipleBooks);
if (JSON.stringify(test9expected) === JSON.stringify(test9result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", test9expected);
    console.log("Received:", test9result);
} 

/* 10. Test that the function correctly handles multiple matches for the searchTerm within the scannedTextObj content.*/
const test10expected = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780735213616",
            "Page": 42,
            "Line": 20
        }
    ]
}
const test10result = findSearchTermInBooks("the", multipleBooks);
if (JSON.stringify(test10expected) === JSON.stringify(test10result)) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", test10expected);
    console.log("Received:", test10result);
} 

/* 11. Test that the function correctly handles multiple scannedTextObj objects in the input array.*/
const test11expected = {
    "SearchTerm": "voyage",
    "Results": [
        {
            "ISBN": "9780735213616",
            "Page": 5,
            "Line": 1
        }
    ]
}
const test11result = findSearchTermInBooks("voyage", multipleBooks);
if (JSON.stringify(test11expected) === JSON.stringify(test11result)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", test11expected);
    console.log("Received:", test11result);
} 

/* 12. Test that the function correctly handles a searchTerm that consists of multiple words.*/
const test12expected = {
    "SearchTerm": "Twenty-five sextillion molecules",
    "Results": [
        {
            "ISBN": "9780735213616",
            "Page": 5,
            "Line": 1
        }
    ]
}
const test12result = findSearchTermInBooks("Twenty-five sextillion molecules", multipleBooks);
if (JSON.stringify(test12expected) === JSON.stringify(test12result)) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test 12");
    console.log("Expected:", test12expected);
    console.log("Received:", test12result);
} 