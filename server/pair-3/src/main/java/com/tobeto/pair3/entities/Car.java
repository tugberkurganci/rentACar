package com.tobeto.pair3.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "cars",uniqueConstraints = @UniqueConstraint(columnNames = "plate"))
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
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


    @Column(name = "image")
    String image;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;

    @ManyToOne
    @JoinColumn(name = "current_location")
    private Location currentLocation;


    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    @Enumerated(EnumType.STRING)
    @JoinColumn(name = "car_status")
    private CarStatus status;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL)
    private List<Rental> rentals;

    public Car(int id, Model model, Color color, int year, BigDecimal dailyPrice, String plate, int kilometer, String image) {
        this.id = id;
        this.model = model;
        this.color = color;
        this.year = year;
        this.dailyPrice = dailyPrice;
        this.plate = plate;
        this.kilometer = kilometer;
        this.image = image;
    }



    public void addRental(Rental rental) {
        this.getRentals().add(rental);
    this.setRentals(getRentals());
    }

}
