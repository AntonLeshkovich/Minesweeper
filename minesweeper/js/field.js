// import { field } from "./main.js"
// export { createField }


// const createField = (width, height) => {
//   const fieldBody = field.firstElementChild;

//   fieldBody.replaceChildren();

//   if (window.innerWidth <= 740) {
//     field.style.width = `${(height * 20) + (height * 2)}px`;
//     field.style.height = `${(width * 20) + (width * 2)}px`;
//   } else {
//     field.style.width = `${(width * 20) + (width * 2)}px`;
//     field.style.height = `${(height * 20) + (height * 2)}px`;
//   }

//   if (window.innerWidth <= 740) {
//     for(let i = 0; i < width; i++) {
//       const fieldRow = fieldBody.insertRow();
//       for (let k = 0; k < height; k++) {
//         fieldRow.insertCell();
//       }
//     }
//   } else {
//     for(let i = 0; i < height; i++) {
//       const fieldRow = fieldBody.insertRow();
//       for (let k = 0; k < width; k++) {
//         fieldRow.insertCell();
//       }
//     }
//   }

// }