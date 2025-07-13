import { useEffect, useRef } from "react";
import { fetchOrderByIdDetails, fetchOrdersKanban } from "../store/kanbanRequests";
import SideBar from "../components/SideBar/sideBar";
import { OrderDetails } from "../components/OrderDetails/OrderDetails";
import { useAppDispatch, useAppSelector } from "@/store";

const KanbanPage = () => {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const ordersKanban = useAppSelector((state) => state.kanban.ordersKanban);
  const selectedOrderId = useAppSelector((state) => state.kanban.selectedOrderId);
  const orderDetails = useAppSelector((state) => state.kanban.orderDetails);
  const isLoading = useAppSelector((state) => state.kanban.loadingOrderDetails);

  // Carrega as orders inicialmente
  useEffect(() => {
    console.log('Carregando orders inicialmente...');
    dispatch(fetchOrdersKanban());
  }, [dispatch]);

  // Polling de 3 segundos para recarregar as orders
  useEffect(() => {
    console.log('Iniciando polling de 3 segundos...');
    
    const startPolling = () => {
      intervalRef.current = setInterval(() => {
        console.log('Executando polling - recarregando orders...');
        dispatch(fetchOrdersKanban());
      }, 3000);
    };

    startPolling();

    // Cleanup do intervalo quando o componente for desmontado
    return () => {
      console.log('Limpando polling...');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedOrderId) {
      dispatch(fetchOrderByIdDetails(selectedOrderId));
    }
  }, [selectedOrderId, dispatch]);

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <SideBar orderKanban={ordersKanban} selectedOrderId={selectedOrderId} />
      {selectedOrderId &&
        <OrderDetails order={orderDetails} isLoading={isLoading} showActions={true} />
      }
    </div>
  )
};

export default KanbanPage;
