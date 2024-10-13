



import React from 'react'

function DeleteConfirmation() {
  return (
    <div>
      <h1>Chegou</h1>
    </div>
  )
}

export default DeleteConfirmation




// import React from 'react';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// interface DeleteConfirmationProps {
//   onConfirm: () => void;
// }

// const DeleteConfirmation = ({ onConfirm }: DeleteConfirmationProps) => {
//   const handleDelete = () => {
//     MySwal.fire({
//       title: 'Você tem certeza?',
//       text: "Você não poderá reverter isso!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#006400',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Sim, continuar!',
//       cancelButtonText: 'Não, cancelar!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         MySwal.fire({
//           title: 'Excluído!',
//           text: 'Seu arquivo foi excluído.',
//           icon: 'success'
//         });
//         if (onConfirm) {
//           onConfirm();
//         }
//       }
//     });
//   };

//   return (
//     <button onClick={handleDelete} className="btn btn-danger">
//       Excluir
//     </button>
//   );
// };

// export default DeleteConfirmation










// import React from 'react';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const DeleteConfirmation = ({ onConfirm }) => {
//   const handleDelete = () => {
//     MySwal.fire({
//       title: 'Você tem certeza?',
//       text: "Você não poderá reverter isso!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#006400',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Sim, continuar!',
//       cancelButtonText: 'Não, cancelar!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         MySwal.fire({
//           title: 'Excluído!',
//           text: 'Seu arquivo foi excluído.',
//           icon: 'success'
//         });
//         if (onConfirm) {
//           onConfirm();
//         }
//       }
//     });
//   };

//   return (
//     <button onClick={handleDelete} className="btn btn-danger">
//       Excluir
//     </button>
//   );
// };

// export default DeleteConfirmation;
