export const PROBLEMS = {
    "two-sum": {
        id: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        category: "Array • Hash Table",
        description: {
            text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
            notes: [
                "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
                "You can return the answer in any order.",
            ],
        },
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]",
            },
        ],
        constraints: [
            "2 ≤ nums.length ≤ 10⁴",
            "-10⁹ ≤ nums[i] ≤ 10⁹",
            "-10⁹ ≤ target ≤ 10⁹",
            "Only one valid answer exists",
        ],
        starterCode: {
            javascript: 
`function twoSum(nums, target) {
    // Write your solution here

}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,

            python: 
`def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,

            cpp: 
`#include <iostream>
#include <vector>

using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    
    return {};
}

int main() {
    vector<int> nums1 = {2, 7, 11, 15};
    vector<int> res1 = twoSum(nums1, 9);
    cout << "[" << res1[0] << "," << res1[1] << "]" << endl; // Expected: [0,1]

    vector<int> nums2 = {3, 2, 4};
    vector<int> res2 = twoSum(nums2, 6);
    cout << "[" << res2[0] << "," << res2[1] << "]" << endl; // Expected: [1,2]

    vector<int> nums3 = {3, 3};
    vector<int> res3 = twoSum(nums3, 6);
    cout << "[" << res3[0] << "," << res3[1] << "]" << endl; // Expected: [0,1]

    return 0;
}`,
        },
        expectedOutput: {
            javascript: "[0,1]\n[1,2]\n[0,1]",
            python: "[0, 1]\n[1, 2]\n[0, 1]",
            cpp: "[0,1]\n[1,2]\n[0,1]",
        },
    },

    "reverse-string": {
        id: "reverse-string",
        title: "Reverse String",
        difficulty: "Easy",
        category: "String • Two Pointers",
        description: {
            text: "Write a function that reverses a string. The input string is given as an array of characters s.",
            notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
        },
        examples: [
            { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
            { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
        ],
        constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
        starterCode: {
            javascript: 
`function reverseString(s) {
    // Write your solution here

}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(JSON.stringify(test1)); // Expected: ["o","l","l","e","h"]

let test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(JSON.stringify(test2)); // Expected: ["h","a","n","n","a","H"]`,

            python: 
`def reverseString(s):
    # Write your solution here
    pass

# Test cases
test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)  # Expected: ["o","l","l","e","h"]

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)  # Expected: ["h","a","n","n","a","H"]`,

            cpp: 
`#include <iostream>
#include <vector>

using namespace std;

void reverseString(vector<char>& s) {
    // Write your solution here
    
}

void printVector(const vector<char>& s) {
    cout << "[";
    for(size_t i = 0; i < s.size(); ++i) {
        cout << "\\"" << s[i] << "\\"";
        if(i < s.size() - 1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    vector<char> test1 = {'h','e','l','l','o'};
    reverseString(test1);
    printVector(test1); // Expected: ["o","l","l","e","h"]

    vector<char> test2 = {'H','a','n','n','a','h'};
    reverseString(test2);
    printVector(test2); // Expected: ["h","a","n","n","a","H"]

    return 0;
}`,
        },
        expectedOutput: {
            javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
            python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
            cpp: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
        },
    },

    "valid-palindrome": {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        category: "String • Two Pointers",
        description: {
            text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
            notes: ["Given a string s, return true if it is a palindrome, or false otherwise."],
        },
        examples: [
            { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
            { input: 's = "race a car"', output: "false" },
        ],
        constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
        starterCode: {
            javascript: 
`function isPalindrome(s) {
    // Write your solution here

}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" ")); // Expected: true`,

            python: 
`def isPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(isPalindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(isPalindrome("race a car"))  # Expected: False
print(isPalindrome(" "))  # Expected: True`,

            cpp: 
`#include <iostream>
#include <string>

using namespace std;

bool isPalindrome(string s) {
    // Write your solution here
    
    return false;
}

int main() {
    cout << (isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false") << endl; // Expected: true
    cout << (isPalindrome("race a car") ? "true" : "false") << endl;            // Expected: false
    cout << (isPalindrome(" ") ? "true" : "false") << endl;                     // Expected: true
    return 0;
}`,
        },
        expectedOutput: {
            javascript: "true\nfalse\ntrue",
            python: "True\nFalse\nTrue",
            cpp: "true\nfalse\ntrue",
        },
    },

    "maximum-subarray": {
        id: "maximum-subarray",
        title: "Maximum Subarray",
        difficulty: "Medium",
        category: "Array • Dynamic Programming",
        description: {
            text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
            notes: [],
        },
        examples: [
            { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
        ],
        constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
        starterCode: {
            javascript: 
`function maxSubArray(nums) {
    // Write your solution here

}

// Test cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1])); // Expected: 1
console.log(maxSubArray([5,4,-1,7,8])); // Expected: 23`,

            python: 
`def maxSubArray(nums):
    # Write your solution here
    pass

# Test cases
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
print(maxSubArray([1]))  # Expected: 1
print(maxSubArray([5,4,-1,7,8]))  # Expected: 23`,

            cpp: 
`#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int maxSubArray(vector<int>& nums) {
    // Write your solution here
    
    return 0;
}

int main() {
    vector<int> nums1 = {-2,1,-3,4,-1,2,1,-5,4};
    cout << maxSubArray(nums1) << endl; // Expected: 6

    vector<int> nums2 = {1};
    cout << maxSubArray(nums2) << endl; // Expected: 1

    vector<int> nums3 = {5,4,-1,7,8};
    cout << maxSubArray(nums3) << endl; // Expected: 23

    return 0;
}`,
        },
        expectedOutput: {
            javascript: "6\n1\n23",
            python: "6\n1\n23",
            cpp: "6\n1\n23",
        },
    },

    "container-with-most-water": {
        id: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        category: "Array • Two Pointers",
        description: {
            text: "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
            notes: ["Return the maximum amount of water a container can store.", "Notice that you may not slant the container."],
        },
        examples: [
            { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
        ],
        constraints: ["2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
        starterCode: {
            javascript: 
`function maxArea(height) {
    // Write your solution here

}

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49
console.log(maxArea([1,1])); // Expected: 1`,

            python: 
`def maxArea(height):
    # Write your solution here
    pass

# Test cases
print(maxArea([1,8,6,2,5,4,8,3,7]))  # Expected: 49
print(maxArea([1,1]))  # Expected: 1`,

            cpp: 
`#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int maxArea(vector<int>& height) {
    // Write your solution here
    
    return 0;
}

int main() {
    vector<int> test1 = {1,8,6,2,5,4,8,3,7};
    cout << maxArea(test1) << endl; // Expected: 49

    vector<int> test2 = {1,1};
    cout << maxArea(test2) << endl; // Expected: 1

    return 0;
}`,
        },
        expectedOutput: {
            javascript: "49\n1",
            python: "49\n1",
            cpp: "49\n1",
        },
    },

    "valid-parentheses": {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        difficulty: "Easy",
        category: "String • Stack",
        description: {
            text: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
            notes: [
                "An input string is valid if open brackets are closed by the same type of brackets.",
                "Open brackets must be closed in the correct order.",
                "Every close bracket has a corresponding open bracket of the same type."
            ],
        },
        examples: [
            { input: 's = "()"', output: "true" },
            { input: 's = "()[]{}"', output: "true" },
            { input: 's = "(]"', output: "false" },
        ],
        constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'"],
        starterCode: {
            javascript: 
`function isValid(s) {
    // Write your solution here

}

// Test cases
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false`,

            python: 
`def isValid(s):
    # Write your solution here
    pass

# Test cases
print(isValid("()"))  # Expected: True
print(isValid("()[]{}"))  # Expected: True
print(isValid("(]"))  # Expected: False`,

            cpp: 
`#include <iostream>
#include <string>
#include <stack>

using namespace std;

bool isValid(string s) {
    // Write your solution here
    
    return false;
}

int main() {
    cout << (isValid("()") ? "true" : "false") << endl;     // Expected: true
    cout << (isValid("()[]{}") ? "true" : "false") << endl; // Expected: true
    cout << (isValid("(]") ? "true" : "false") << endl;     // Expected: false
    return 0;
}`,
        },
        expectedOutput: {
            javascript: "true\ntrue\nfalse",
            python: "True\nTrue\nFalse",
            cpp: "true\ntrue\nfalse", 
        },
    },

    "longest-substring-without-repeating-characters": {
        id: "longest-substring-without-repeating-characters",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        category: "String • Sliding Window",
        description: {
            text: "Given a string s, find the length of the longest substring without repeating characters.",
            notes: [],
        },
        examples: [
            { input: 's = "abcabcbb"', output: "3", explanation: "The answer is 'abc', with the length of 3." },
            { input: 's = "bbbbb"', output: "1", explanation: "The answer is 'b', with the length of 1." },
        ],
        constraints: ["0 ≤ s.length ≤ 5 * 10⁴", "s consists of English letters, digits, symbols and spaces."],
        starterCode: {
            javascript: 
`function lengthOfLongestSubstring(s) {
    // Write your solution here

}

// Test cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
console.log(lengthOfLongestSubstring("bbbbb")); // Expected: 1
console.log(lengthOfLongestSubstring("pwwkew")); // Expected: 3`,

            python: 
`def lengthOfLongestSubstring(s):
    # Write your solution here
    pass

# Test cases
print(lengthOfLongestSubstring("abcabcbb"))  # Expected: 3
print(lengthOfLongestSubstring("bbbbb"))  # Expected: 1
print(lengthOfLongestSubstring("pwwkew"))  # Expected: 3`,

            cpp: 
`#include <iostream>
#include <string>
#include <unordered_set>
#include <algorithm>

using namespace std;

int lengthOfLongestSubstring(string s) {
    // Write your solution here
    
    return 0;
}

int main() {
    cout << lengthOfLongestSubstring("abcabcbb") << endl; // Expected: 3
    cout << lengthOfLongestSubstring("bbbbb") << endl;    // Expected: 1
    cout << lengthOfLongestSubstring("pwwkew") << endl;   // Expected: 3
    return 0;
}`,
        },
        expectedOutput: {
            javascript: "3\n1\n3",
            python: "3\n1\n3",
            cpp: "3\n1\n3",
        },
    },

    "product-of-array-except-self": {
        id: "product-of-array-except-self",
        title: "Product of Array Except Self",
        difficulty: "Medium",
        category: "Array • Prefix Sum",
        description: {
            text: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
            notes: ["You must write an algorithm that runs in O(n) time and without using the division operation."],
        },
        examples: [
            { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
            { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
        ],
        constraints: ["2 ≤ nums.length ≤ 10⁵", "-30 ≤ nums[i] ≤ 30", "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."],
        starterCode: {
            javascript: 
`function productExceptSelf(nums) {
    // Write your solution here

}

// Test cases
console.log(productExceptSelf([1,2,3,4])); // Expected: [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3])); // Expected: [0,0,9,0,0]`,

            python: 
`def productExceptSelf(nums):
    # Write your solution here
    pass

# Test cases
print(productExceptSelf([1,2,3,4]))  # Expected: [24, 12, 8, 6]
print(productExceptSelf([-1,1,0,-3,3]))  # Expected: [0, 0, 9, 0, 0]`,

            cpp: 
`#include <iostream>
#include <vector>

using namespace std;

vector<int> productExceptSelf(vector<int>& nums) {
    // Write your solution here
    
    return {};
}

void printVector(const vector<int>& nums) {
    cout << "[";
    for(size_t i = 0; i < nums.size(); ++i) {
        cout << nums[i];
        if(i < nums.size() - 1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    vector<int> nums1 = {1,2,3,4};
    vector<int> res1 = productExceptSelf(nums1);
    printVector(res1); // Expected: [24,12,8,6]

    vector<int> nums2 = {-1,1,0,-3,3};
    vector<int> res2 = productExceptSelf(nums2);
    printVector(res2); // Expected: [0,0,9,0,0]

    return 0;
}`,
        },
        expectedOutput: {
            javascript: "[24,12,8,6]\n[0,0,9,0,0]",
            python: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
            cpp: "[24,12,8,6]\n[0,0,9,0,0]",
        },
    },

    "trapping-rain-water": {
        id: "trapping-rain-water",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        category: "Two Pointers • Stack • Dynamic Programming",
        description: {
            text: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
            notes: [],
        },
        examples: [
            { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "6 units of rain water are being trapped." },
            { input: "height = [4,2,0,3,2,5]", output: "9" },
        ],
        constraints: ["n == height.length", "1 ≤ n ≤ 2 * 10⁴", "0 ≤ height[i] ≤ 10⁵"],
        starterCode: {
            javascript: 
`function trap(height) {
    // Write your solution here

}

// Test cases
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // Expected: 6
console.log(trap([4,2,0,3,2,5])); // Expected: 9`,

            python: 
`def trap(height):
    # Write your solution here
    pass

# Test cases
print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # Expected: 6
print(trap([4,2,0,3,2,5]))  # Expected: 9`,

            cpp: 
`#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int trap(vector<int>& height) {
    // Write your solution here
    
    return 0;
}

int main() {
    vector<int> test1 = {0,1,0,2,1,0,1,3,2,1,2,1};
    cout << trap(test1) << endl; // Expected: 6

    vector<int> test2 = {4,2,0,3,2,5};
    cout << trap(test2) << endl; // Expected: 9

    return 0;
}`,
        },
        expectedOutput: {
            javascript: "6\n9",
            python: "6\n9",
            cpp: "6\n9",
        },
    },

    "sliding-window-maximum": {
        id: "sliding-window-maximum",
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        category: "Array • Sliding Window • Deque",
        description: {
            text: "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right.",
            notes: ["You can only see the k numbers in the window.", "Each time the sliding window moves right by one position.", "Return the max sliding window."],
        },
        examples: [
            { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
            { input: "nums = [1], k = 1", output: "[1]" },
        ],
        constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴", "1 ≤ k ≤ nums.length"],
        starterCode: {
            javascript: 
`function maxSlidingWindow(nums, k) {
    // Write your solution here

}

// Test cases
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // Expected: [3,3,5,5,6,7]
console.log(maxSlidingWindow([1], 1)); // Expected: [1]`,

            python: 
`def maxSlidingWindow(nums, k):
    # Write your solution here
    pass

# Test cases
print(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))  # Expected: [3, 3, 5, 5, 6, 7]
print(maxSlidingWindow([1], 1))  # Expected: [1]`,

            cpp: 
`#include <iostream>
#include <vector>
#include <deque>

using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    // Write your solution here
    
    return {};
}

void printVector(const vector<int>& nums) {
    cout << "[";
    for(size_t i = 0; i < nums.size(); ++i) {
        cout << nums[i];
        if(i < nums.size() - 1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    vector<int> nums1 = {1,3,-1,-3,5,3,6,7};
    vector<int> res1 = maxSlidingWindow(nums1, 3);
    printVector(res1); // Expected: [3,3,5,5,6,7]

    vector<int> nums2 = {1};
    vector<int> res2 = maxSlidingWindow(nums2, 1);
    printVector(res2); // Expected: [1]

    return 0;
}`,
        },
        expectedOutput: {
            javascript: "[3,3,5,5,6,7]\n[1]",
            python: "[3, 3, 5, 5, 6, 7]\n[1]",
            cpp: "[3,3,5,5,6,7]\n[1]",
        },
    },
};

export const LANGUAGE_CONFIG = {
    javascript: {
        name: "JavaScript",
        icon: "/javascript.png",
        monacoLang: "javascript",
    },
    python: {
        name: "Python",
        icon: "/python.png",
        monacoLang: "python",
    },
    cpp: {
        name: "C++",
        icon: "/cpp.png",
        monacoLang: "cpp",
    },
};