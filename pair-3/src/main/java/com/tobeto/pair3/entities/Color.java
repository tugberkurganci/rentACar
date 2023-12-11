package com.tobeto.pair3.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "colors")
@Data
public class Color {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "color")
    private List<Car> cars;
}
