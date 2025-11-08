
let cache = document.getElementById("card_template")


export default function getCardTemplate() {
  cache ??= document.getElementById("card_template")
  return cache as HTMLDivElement;
}
