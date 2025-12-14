const score1 = Number(sessionStorage.getItem("game1-score")) ?? "ei vielä pelattu";
const score2 = Number(sessionStorage.getItem("game2-score")) ?? "ei vielä pelattu";
const score3 = Number(sessionStorage.getItem("game3-score")) ?? "ei vielä pelattu";
const score4 = Number(sessionStorage.getItem("game4-score")) ?? "ei vielä pelattu";

const totalscore = score1 + score2 + score3 + score4;

document.getElementById("game1result").textContent = `Prosenttilaskut: ${score1}/15`;
document.getElementById("game2result").textContent = `Geometria: ${score2}/5`;
document.getElementById("game3result").textContent = `Kerto- ja jakolaskut: ${score3}/10`;
document.getElementById("game4result").textContent = `Yhteen- ja vähennyslaskut: ${score4}/10`;

document.getElementById("totalresult").textContent = `Kokonaispisteet: ${totalscore}/40`;