
const output = document.getElementById("output");

// Initially show Loading...
output.innerHTML = `
  <tr>
    <td colspan="2">Loading...</td>
  </tr>
`;

// Function to create a promise with random delay
function createPromise() {
  const delay = Math.floor(Math.random() * 2000) + 1000;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay / 1000);
    }, delay);
  });
}

// Record the total starting time
const startTime = performance.now();

// Create three promises
const promise1 = createPromise();
const promise2 = createPromise();
const promise3 = createPromise();

// Wait for all promises to resolve
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    const totalTime = (performance.now() - startTime) / 1000;

    // Remove Loading row
    output.innerHTML = "";

    // Display individual promise results
    results.forEach((time, index) => {
      output.innerHTML += `
        <tr>
          <td>Promise ${index + 1}</td>
          <td>${time.toFixed(3)}</td>
        </tr>
      `;
    });

    // Display total time
    output.innerHTML += `
      <tr>
        <td>Total</td>
        <td>${totalTime.toFixed(3)}</td>
      </tr>
    `;
  })
  .catch((error) => {
    console.log(error);
  });
