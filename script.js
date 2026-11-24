const output = document.getElementById("output");

output.innerHTML = `
  <tr>
    <td colspan="2">Loading...</td>
  </tr>
`;

function createPromise() {
  const delay = Math.floor(Math.random() * 2000) + 1000;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay / 1000);
    }, delay);
  });
}

const startTime = performance.now();

Promise.all([
  createPromise(),
  createPromise(),
  createPromise()
])
  .then((results) => {
  const totalTime = Math.max(...results);   // <-- the change

  output.innerHTML = "";

  results.forEach((time, index) => {
    output.innerHTML += `
      <tr>
        <td>Promise ${index + 1}</td>
        <td>${time.toFixed(3)}</td>
      </tr>
    `;
  });

  output.innerHTML += `
    <tr>
      <td>Total</td>
      <td>${totalTime.toFixed(3)}</td>
    </tr>
  `;
})
  .catch(console.error);
