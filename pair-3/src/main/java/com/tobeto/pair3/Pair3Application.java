package com.tobeto.pair3;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Pair3Application {

	public static void main(String[] args) {

		SpringApplication.run(Pair3Application.class, args);
	}
	@Bean
	public ModelMapper getModelMapper() {
		return new ModelMapper();
	}


	/*
	* Rental, Car Tuğberk
	*
	* User Halil
	*
	* Model Rami
	*
	* Color ,Invoice Duygu
	*
	*
	* */

}
