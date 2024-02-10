package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.messages.Messages;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.*;
import com.tobeto.pair3.repositories.CarRepository;
import com.tobeto.pair3.services.abstracts.CarService;
import com.tobeto.pair3.services.abstracts.ColorService;
import com.tobeto.pair3.services.abstracts.LocationService;
import com.tobeto.pair3.services.abstracts.ModelService;
import com.tobeto.pair3.services.businessrules.RentalRules;
import com.tobeto.pair3.services.dtos.requests.*;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class CarManager implements CarService {
    private  CarRepository carRepository;
    private  ModelService modelService;
    private  ColorService colorService;
    private  ModelMapperService mapperService;

    private  RentalRules rentalRules;
    private  FileService fileService;
    private   LocationService locationService;

    public CarManager(CarRepository carRepository, @Lazy ModelService modelService, ColorService colorService, ModelMapperService mapperService, RentalRules rentalRules, FileService fileService, LocationService locationService) {
        this.carRepository = carRepository;
        this.modelService = modelService;
        this.colorService = colorService;
        this.mapperService = mapperService;
        this.rentalRules = rentalRules;
        this.fileService = fileService;
        this.locationService = locationService;
    }


    public void add(CreateCarRequest createCarRequest) {


        checkExistByPlate(createCarRequest.getPlate());

        Model model = modelService.findByModelName(createCarRequest.getModelName());
        Color color = colorService.findByColorName(createCarRequest.getColorName());
        Location location=locationService.findByName(createCarRequest.getLocation());
        Car car = Car
                .builder()
                .color(color)
                .model(model)
                .status(CarStatus.AVAILABLE)
                .year(createCarRequest.getYear())
                .dailyPrice(createCarRequest.getDailyPrice())
                .plate(createCarRequest.getPlate())
                .kilometer(createCarRequest.getKilometer())
                .currentLocation(location)
                .build();


        if (createCarRequest.getImage() != null) {
            String fileName = fileService.saveBase64StringAsFile(createCarRequest.getImage(), "car");
            car.setImage(fileName);
        }

        carRepository.save(car);
    }


    public void update(UpdateCarRequest updateCarRequest) {

        Car carToUpdate = this.getOriginalCarById(updateCarRequest.getId());
        Color color = colorService.findByColorName(updateCarRequest.getColorName());
        Model model = modelService.findByModelName(updateCarRequest.getModelName());
        Location location=locationService.findByName(updateCarRequest.getLocation());
        Car car = Car
                .builder()
                .id(updateCarRequest.getId())
                .color(color)
                .model(model)
                .year(updateCarRequest.getYear())
                .status(CarStatus.valueOf(updateCarRequest.getStatus()))
                .dailyPrice(updateCarRequest.getDailyPrice())
                .plate(updateCarRequest.getPlate())
                .kilometer(updateCarRequest.getKilometer())
                .rentals(carToUpdate.getRentals())
                .image(carToUpdate.getImage())
                .currentLocation(location)
                .build();

        if (updateCarRequest.getImage() != null) {

            String fileName = fileService.saveBase64StringAsFile(updateCarRequest.getImage(), "car");
            fileService.deleteCarImage(carToUpdate.getImage(), "car");
            car.setImage(fileName);
        }

        carRepository.save(car);
    }

    public void delete(Integer id) {
        Car car = this.getOriginalCarById(id);
        carRepository.delete(car);
    }

    public List<GetCarResponse> getAll() {
        List<Car> carList = carRepository.findAll();
        List<GetCarResponse> responseList = carList.stream()
                .map(car ->  {
                    GetCarResponse response=mapperService.forResponse().map(car, GetCarResponse.class);
                    response.setLocation(car.getCurrentLocation().getName());
                    return response;
                })
                .toList();
        return responseList;
    }

    public GetCarResponse getById(Integer id) {
        Car car = this.getOriginalCarById(id);
        GetCarResponse response = mapperService.forResponse().map(car, GetCarResponse.class);
        return response;
    }

    @Override
    public boolean existsById(int carId) {
        return carRepository.existsById(carId);
    }

    @Override
    public Car getOriginalCarById(int carId) {
        return carRepository.findById(carId).orElseThrow(() ->
                new BusinessException(Messages.getMessageForLocale("rentACar.exception.rental.car.notfound", LocaleContextHolder.getLocale())));
    }

    @Override
    public List<GetCarResponse> getRentableCars(CreateRentableCarRequest request) {

        rentalRules.checkIsDateBeforeNow(request.getStartDate());
        rentalRules.checkEndDateIsBeforeStartDate(request.getEndDate(), request.getStartDate());
        rentalRules.checkIsRentalDateLongerThan25Days(request.getStartDate(), request.getEndDate());
        List<Car> carList = carRepository.findByStatus(CarStatus.AVAILABLE);
        List<Car> rentableCarList = new ArrayList<>();
        convertToRentableCarList(carList, rentableCarList, request);
        List<Car> availableCars = checkIsSuitableLocations(rentableCarList, request);
        return availableCars.stream().map(car -> mapperService.forResponse().map(car, GetCarResponse.class)).toList();
    }

    private List<Car> checkIsSuitableLocations(List<Car> rentableCarList, CreateRentableCarRequest request) {

        if (request.getDropOffLocation() == null) request.setDropOffLocation(request.getPickUpLocation());

        List<Car> availableCars = new ArrayList<>();
        rentableCarList.forEach(car ->
        {
            if (isAvailableLocation(car, request)) availableCars.add(car);
        });

        return availableCars;
    }

    public boolean isAvailableLocation(Car car, CreateRentableCarRequest request) {
        Rental rental1 = null;
        Rental rental2 = null;
        boolean isSuitable = false;


        List<Rental> rentals = car.getRentals();
        if (rentals.size() == 0 &&
                car.getCurrentLocation().getName().equals(request.getPickUpLocation())) return true;
        if (rentals.size() == 0) return false;


        rentals.sort(Comparator.comparing(Rental::getStartDate));

        if (rentals.size() == 1) {
            if ((rentals.get(0).getEndDate().isBefore(request.getStartDate()) && rentals.get(0).getDropOffLocation().getName().equals(request.getPickUpLocation()))
                    || (rentals.get(0).getStartDate().isAfter(request.getEndDate()) && rentals.get(0).getPickUpLocation().getName().equals(request.getDropOffLocation())))
                return true;
        }


        for (int i = 0; i < rentals.size() - 1; i++) {

            if (request.getStartDate().isAfter(rentals.get(i).getEndDate()) && request.getEndDate().isBefore(rentals.get(i + 1).getStartDate())) {
                rental1 = car.getRentals().get(i);
                rental2 = car.getRentals().get(i + 1);

                break;
            }
            if (i == rentals.size() - 2 && rentals.get(i + 1).getEndDate().isBefore(request.getStartDate())) {

                rental2 = rentals.get(i + 1);
                break;
            }
            if (i == 0 && rentals.get(i).getStartDate().isAfter(request.getEndDate())) {

                rental2 = rentals.get(i);
                break;
            }

        }
        if (rental1 == null && rental2 != null) {
            if (rental2.getDropOffLocation().getName().equals(request.getPickUpLocation()) ||
                    (rental2.getPickUpLocation().getName().equals(request.getDropOffLocation()) && rental2.equals(rentals.get(0))))
                isSuitable = true;
        } else {
            if (rental1 != null)
                if (rental1.getDropOffLocation().getName().equals(request.getPickUpLocation()) && rental2.getPickUpLocation().getName().equals(request.getDropOffLocation()))
                    isSuitable = true;
        }

        return isSuitable;
    }


    public boolean isReservable(Car car, CreateRentableCarRequest request) {

        if (car.getRentals() == null) return true;
        boolean isReserable = true;

        List<Rental> rentals = car.getRentals();
        for (Rental rental : rentals) {

            if (rental.getEndDate().isBefore(request.getStartDate()) || rental.getStartDate().isAfter(request.getEndDate())) {

            } else {
                isReserable = false;
                break;
            }
        }

        return isReserable;
    }

    @Override
    public Page<GetCarResponse> getAllViaPage(Pageable pageable) {
        return carRepository.findAll(pageable).map(car -> {
            GetCarResponse response=mapperService.forResponse().map(car, GetCarResponse.class);
            response.setLocation(car.getCurrentLocation().getName());
            response.setStatus(car.getStatus().name());
            return response;
        });

    }

    private void checkExistByPlate(String plate) {

        if (carRepository.existsByPlate(plate)) {
            throw new BusinessException(Messages.getMessageForLocale("rentACar.exception.same.plate.exists", LocaleContextHolder.getLocale()));
        }
    }

    @Override
    public Page<GetCarResponse> searchKeyAndGetUser(String searchKey, Pageable pageable) {
        return carRepository.searchKeyAndGetUser(searchKey, pageable);
    }

    private void convertToRentableCarList(List<Car> carList, List<Car> rentableCarList, CreateRentableCarRequest request) {

        carList.forEach(car -> {
            if (isReservable(car, request)) {
                rentableCarList.add(car);
            }
        });


    }

    @Override
    public List<GetCarResponse> filterCars(FilterCarRequest filterCarRequest) {
        List<GetCarResponse> filteredCars = new ArrayList<>();

        for (CarModel car : filterCarRequest.getCarList()) {


            if (!filterCarRequest.getModelName().equals("") && !car.getModelName().equalsIgnoreCase(filterCarRequest.getModelName())) {
                continue;
            }

            if (!filterCarRequest.getBrandName().equals("") && !car.getBrandName().equalsIgnoreCase(filterCarRequest.getBrandName())) {
                continue;
            }
            if (filterCarRequest.getFirstPrice() != 0 && car.getDailyPrice().compareTo(new BigDecimal(filterCarRequest.getFirstPrice())) < 0) {
                continue;
            }
            if (filterCarRequest.getSecondPrice() != 0 && car.getDailyPrice().compareTo(new BigDecimal(filterCarRequest.getSecondPrice())) > 0) {
                continue;
            }
            if (filterCarRequest.getFirstModelYear() != 0 && car.getYear() < filterCarRequest.getFirstModelYear()) {
                continue;
            }
            if (filterCarRequest.getSecondModelYear() != 0 && car.getYear() > filterCarRequest.getSecondModelYear()) {
                continue;
            }
            CarModel carModel = new CarModel();

            filteredCars.add(carModel.getResponse(car));
        }

        return filteredCars;

    }

    @Override
    public List<GetCarResponse> sortCars(SortCarsRequest sortCarsRequest) {
        Comparator<GetCarResponse> comparator;

        switch (sortCarsRequest.getSortType()) {
            case "price-asc":
                comparator = Comparator.comparing(GetCarResponse::getDailyPrice);
                break;
            case "price-desc":
                comparator = Comparator.comparing(GetCarResponse::getDailyPrice).reversed();
                break;

            default:
                throw new IllegalArgumentException("Invalid sort option");
        }
        List<GetCarResponse> beforeSortedList = new ArrayList<>();
        for (CarModel c : sortCarsRequest.getCarList()
        ) {
            CarModel carModel = new CarModel();
            GetCarResponse carModelResponse = carModel.getResponse(c);
            beforeSortedList.add(carModelResponse);
        }

        return beforeSortedList.stream()
                .sorted(comparator)
                .collect(Collectors.toList());
    }
}
