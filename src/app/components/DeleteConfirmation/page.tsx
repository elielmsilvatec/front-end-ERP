import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface DeleteConfirmationProps {
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm }) => {
  const handleDelete = () => {
    MySwal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#006400',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, continuar!',
      cancelButtonText: 'Não, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: 'Excluído!',
          text: 'Seu arquivo foi excluído.',
          icon: 'success',
        });
        if (onConfirm) {
          onConfirm();
        }
      }
    });
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Excluir
    </button>
  );
};

export default DeleteConfirmation;