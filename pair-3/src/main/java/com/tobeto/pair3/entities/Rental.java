package com.tobeto.pair3.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "rentals")
@Data
public class Rental {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "start_kilometer")
    private int startKilometer;

    @Column(name = "end_kilometer")
    private int endKilometer;

    @Column(name = "total_price")
    private BigDecimal totalPrice;


    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "rental")
    private List<Invoice> invoices;


}
