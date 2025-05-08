import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getService, updateService } from '../../redux/slices/servicesSlice';
import ServicesTable from '../../Tables/ServicesTable/ServicesTable';
import ServiceEditModal from '../../components/ServicesEditModal/ServicesEditModal';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import { RotatingLines } from 'react-loader-spinner';

const ServicesPage = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.servicesReducer);

  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  const handleEdit = (service, mode, index = null) => {
    setSelectedService({ service, type: 'edit', mode, index });
    setModalOpen(true);
  };

  const handleAdd = (service, mode) => {
    setSelectedService({ service, type: 'add', mode });
    setModalOpen(true);
  };

  const handleDelete = (service, mode, index) => {
    setDeleteTarget({ service, mode, index });
  };

  const confirmDelete = () => {
    const { service, mode, index } = deleteTarget;
    const updated = { ...service };
    updated[mode] = [...updated[mode]];
    updated[mode].splice(index, 1);
    dispatch(updateService({ id: service.id, updatedData: updated }));
    setDeleteTarget(null);
  };

  const handleSubmitModal = (updatedList, serviceId, mode) => {
    dispatch(updateService({ id: serviceId, updatedData: { [mode]: updatedList } }));
    setModalOpen(false);
  };

  return (
    <div className="servicesPage">
      <h3>Список услуг</h3>
      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <ServicesTable
          data={services}
          onEdit={handleEdit}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      )}

      {modalOpen && (
        <ServiceEditModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          context={selectedService}
          onSubmit={handleSubmitModal}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          deleteFunc={confirmDelete}
        />
      )}
    </div>
  );
};

export default ServicesPage;
