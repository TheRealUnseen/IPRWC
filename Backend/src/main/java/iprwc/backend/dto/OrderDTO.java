package iprwc.backend.dto;

import iprwc.backend.models.enums.OrderStatus;
import java.sql.Timestamp;
import java.util.List;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;


public class OrderDTO {
    private List<OrderItemDTO> orderItems;
    private Timestamp orderDate;
    private double totalPrice;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    public OrderDTO(List<OrderItemDTO> orderItems, Timestamp orderDate, double totalPrice, OrderStatus status) {
        this.orderItems = orderItems;
        this.orderDate = orderDate;
        this.totalPrice = totalPrice;
        this.status = status;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public OrderStatus getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return "OrderDTO{" +
                "orderItems=" + orderItems +
                ", orderDate=" + orderDate +
                ", totalPrice=" + totalPrice +
                ", status=" + status +
                '}';
    }
}
