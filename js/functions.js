// Переменная для теста функции
const example = 'afafaffaf';

// функция для проверки длины строки
function stringLength(str, symbols) {
  return str.length <= symbols;
}

console.log(stringLength(example, 30));


// проверка на полиндром
const exemple = 'То  п??от';

function checkPalindrome(str) {
  str = str.toString();

  str = str.toLowerCase().replace(/\s|[,.!?"'/-]/g, '');
  return str === str.split('').reverse().join('');
}

console.log(checkPalindrome(exemple));
