package com.tobeto.pair3.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "rentals")
@Data
@AllArgsConstructor
@NoArgsConstructor
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
    private Integer startKilometer;

    @Column(name = "end_kilometer",nullable = true)
    private Integer endKilometer;

    @Column(name = "total_price")
    private BigDecimal totalPrice;


    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;



    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "rental",cascade = {CascadeType.PERSIST, CascadeType.REMOVE},fetch = FetchType.LAZY)
    private List<Invoice> invoices;

    @ManyToOne
    @JoinColumn(name = "pick_up_location")
    private Location pickUpLocation;

    @ManyToOne
    @JoinColumn(name = "drop_off_location")
    private Location dropOffLocation;


    public Rental (LocalDate startDate,LocalDate endDate){
        this.startDate=startDate;
        this.endDate=endDate;
    }


}
