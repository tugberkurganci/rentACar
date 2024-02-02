package com.tobeto.pair3.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "brands")
@Data
public class Brand {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @OneToMany(mappedBy = "brand")
    private List<Model> models;





}
