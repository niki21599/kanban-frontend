export let getRandomNumber = () => {
  let min = 1;
  let max = 1000000;
  return Math.round(Math.random() * (max - min)) + min;
};

export let getFirstname = () => {
  let random = Math.round(Math.random() * (7 - 0)) + 0;
  let names = [
    "Luca",
    "Philipp",
    "Niklas",
    "Julian",
    "Tim",
    "Justus",
    "Nico",
    "Matthias",
    "Fabian",
  ];
  return names[random];
};

export let getLastname = () => {
  let random = Math.round(Math.random() * (7 - 0)) + 0;
  let names = [
    "Groß",
    "Wallrich",
    "Burg",
    "Thielen",
    "Klein",
    "Loch",
    "Jakob",
    "Schmitt",
    "Dany",
  ];
  return names[random];
};
