package com.tobeto.pair3.entities;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "models")
@Data

public class Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;


    @Column(name = "image")
    private String image;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand  brand;

    @OneToMany(mappedBy = "model",cascade = CascadeType.ALL)
    private List<Car> cars;

}
