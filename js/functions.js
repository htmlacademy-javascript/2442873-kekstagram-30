// Переменная для теста функции
const example = 'afafaffaf';

// функция для проверки длины строки
function stringLength(str, symbols) {
  return str.length <= symbols;
}

stringLength(example, 30);


// проверка на полиндром
const exemple = 'То  п??от';

function checkPalindrome(str) {
  str = str.toString();

  str = str.toLowerCase().replace(/\s|[,.!?"'/-]/g, '');
  return str === str.split('').reverse().join('');
}

checkPalindrome(exemple);

// 5.16

const timeToString = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  return (hours * 60) + Number(minutes);
};

const isWorkingTime = (startWork, endWork, startMeeting, longMeeting) => {
  startWork = timeToString(startWork);
  endWork = timeToString(endWork);
  startMeeting = timeToString(startMeeting);
  return (startMeeting >= startWork) && (startMeeting + longMeeting) <= endWork;
};

isWorkingTime('09:00', '18:00', '10:00', 120);
isWorkingTime('09:00', '17:00', '16:00', 90);
