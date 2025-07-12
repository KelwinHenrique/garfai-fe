import { useEffect } from "react";
import { fetchOrderByIdDetails, fetchOrdersKanban } from "../store/kanbanRequests";
import SideBar from "../components/SideBar/sideBar";
import { OrderDetails } from "../components/OrderDetails/OrderDetails";
import { useAppDispatch, useAppSelector } from "@/store";

const KanbanPage = () => {
  const dispatch = useAppDispatch();

  const ordersKanban = useAppSelector((state) => state.kanban.ordersKanban);
  const selectedOrderId = useAppSelector((state) => state.kanban.selectedOrderId);
  const orderDetails = useAppSelector((state) => state.kanban.orderDetails);
  const isLoading = useAppSelector((state) => state.kanban.loadingOrderDetails);

  useEffect(() => {
    dispatch(fetchOrdersKanban());
  }, []);

  useEffect(() => {
    if (selectedOrderId) {
      dispatch(fetchOrderByIdDetails(selectedOrderId));
    }
  }, [selectedOrderId]);

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
