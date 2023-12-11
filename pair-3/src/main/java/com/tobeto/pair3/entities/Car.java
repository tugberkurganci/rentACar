package com.tobeto.pair3.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "cars")
@Data
public class Car {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "kilometer")
    private int kilometer;

    @Column(name = "plate")
    private String plate;

    @Column(name = "year")
    private int year;

    @Column(name = "daily_price")
    private BigDecimal dailyPrice;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;


    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    @OneToMany(mappedBy = "car")
    private List<Rental> rentals;


}
