package com.tobeto.pair3.services.concretes;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.utils.mapper.ModelMapperManager;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Color;
import com.tobeto.pair3.entities.Model;
import com.tobeto.pair3.repositories.CarRepository;
import com.tobeto.pair3.services.abstracts.ColorService;
import com.tobeto.pair3.services.abstracts.ModelService;
import com.tobeto.pair3.services.businessrules.RentalRules;
import com.tobeto.pair3.services.dtos.requests.CreateCarRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateCarRequest;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.entities.Rental;
import com.tobeto.pair3.services.dtos.requests.CreateRentableCarRequest;

import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@ExtendWith(MockitoExtension.class)
class CarManagerTest {
    @Mock
    private CarRepository carRepository;

    @Mock
    private ModelService modelService;

    @Mock
    private ColorService colorService;

    private ModelMapperService mapperService=new ModelMapperManager(new ModelMapper());

    @Mock
    private RentalRules rentalRules;

    @Mock
    private FileService fileService;

    private CarManager carManager;

    @BeforeEach
    void setUp() {
        carManager = new CarManager(carRepository, modelService, colorService, mapperService, rentalRules, fileService);
    }





    @Test
    void add_NewCar_Success() {
        // Arrange
        CreateCarRequest createCarRequest = new CreateCarRequest();
        createCarRequest.setModelName(1);
        createCarRequest.setColorName(1);
        createCarRequest.setYear(2023);
        createCarRequest.setDailyPrice(BigDecimal.valueOf(100));
        createCarRequest.setPlate("ABC123");
        createCarRequest.setKilometer(50000);
        createCarRequest.setImage("base64EncodedImage"); // Örnek bir base64 kodlanmış resim

        Model model = new Model(); // Örnek bir Model nesnesi oluştur
        model.setId(1);
        when(modelService.getOriginalModelById(1)).thenReturn(model);

        Color color = new Color(); // Örnek bir Color nesnesi oluştur
        color.setId(1);
        when(colorService.getOriginalColorById(1)).thenReturn(color);

        when(fileService.saveBase64StringAsFile("base64EncodedImage","car")).thenReturn("image");
        when(carRepository.existsByPlate("ABC123")).thenReturn(false); // Plaka yok

        // Act
        carManager.add(createCarRequest);

        // Assert
        verify(modelService).getOriginalModelById(1);
        verify(colorService).getOriginalColorById(1);
        verify(carRepository).save(any(Car.class));

        // Ek assertler
        ArgumentCaptor<Car> carArgumentCaptor = ArgumentCaptor.forClass(Car.class);
        verify(carRepository).save(carArgumentCaptor.capture());
        Car savedCar = carArgumentCaptor.getValue();
        assertNotNull(savedCar);
        assertEquals(1, savedCar.getModel().getId());
        assertEquals(1, savedCar.getColor().getId());
        assertEquals(2023, savedCar.getYear());
        assertEquals(100, savedCar.getDailyPrice().intValue());
        assertEquals("ABC123", savedCar.getPlate());
        assertEquals(50000, savedCar.getKilometer());
        assertEquals("image", savedCar.getImage());
    }
    @Test
    void update_Car_Success() {
        // Arrange
        UpdateCarRequest updateCarRequest = new UpdateCarRequest();
        updateCarRequest.setId(1);
        updateCarRequest.setModelName(1);
        updateCarRequest.setColorName(1);
        updateCarRequest.setYear(2023);
        updateCarRequest.setDailyPrice(BigDecimal.valueOf(100));
        updateCarRequest.setPlate("ABC123");
        updateCarRequest.setKilometer(50000);
        updateCarRequest.setImage("image");

        Car mockedCar = new Car();
        when(carRepository.findById(1)).thenReturn(Optional.of(mockedCar));

        Color mockedColor = new Color();
        mockedColor.setId(1);
        when(colorService.getOriginalColorById(1)).thenReturn(mockedColor);

        when(fileService.saveBase64StringAsFile("image","car")).thenReturn("image1");

        Model mockedModel = new Model();
        mockedModel.setId(1);
        when(modelService.getOriginalModelById(1)).thenReturn(mockedModel);

        // Act
        carManager.update(updateCarRequest);

        verify(carRepository).findById(1);
        verify(colorService).getOriginalColorById(1);
        verify(modelService).getOriginalModelById(1);


        // Assert
        ArgumentCaptor<Car> carArgumentCaptor = ArgumentCaptor.forClass(Car.class);
        verify(carRepository).save(carArgumentCaptor.capture());
        Car savedCar = carArgumentCaptor.getValue();
        assertNotNull(savedCar);
        assertEquals(1, savedCar.getModel().getId());
        assertEquals(1, savedCar.getColor().getId());
        assertEquals(2023, savedCar.getYear());
        assertEquals(100, savedCar.getDailyPrice().intValue());
        assertEquals("ABC123", savedCar.getPlate());
        assertEquals(50000, savedCar.getKilometer());
        assertEquals("image1", savedCar.getImage());
    }

    @Test
    void delete_Car_Success() {
        // Arrange
        int carId = 1;
        Car mockedCar = new Car(); // Örnek bir araba nesnesi oluştur
        when(carRepository.findById(carId)).thenReturn(Optional.of(mockedCar)); // ID 1 olan araba var

        // Act
        carManager.delete(carId);

        // Assert
        verify(carRepository).findById(carId); // Araba ID'siyle findById metodunun çağrıldığını kontrol et
        verify(carRepository).delete(any(Car.class)); // Araba silme işleminin yapıldığını kontrol et
    }

    @Test
    void getAll_Cars_Success() {
        // Arrange
        List<Car> carList = Arrays.asList(
                new Car(1, new Model(), new Color(), 2022, BigDecimal.valueOf(100), "ABC123", 50000, "image1"),
                new Car(2, new Model(), new Color(), 2023, BigDecimal.valueOf(150), "DEF456", 60000, "image2")
        );
        when(carRepository.findAll()).thenReturn(carList);

        // Act
        List<GetCarResponse> responseList = carManager.getAll();

        // Assert
        assertEquals(carList.size(), responseList.size());

        for (int i = 0; i < carList.size(); i++) {
            Car car = carList.get(i);
            GetCarResponse response = responseList.get(i);
            assertEquals(car.getId(), response.getId());
            assertEquals(car.getModel().getName(), response.getModelName());
            assertEquals(car.getColor().getName(), response.getColorName());
            assertEquals(car.getYear(), response.getYear());
            assertEquals(car.getDailyPrice(), response.getDailyPrice());
            assertEquals(car.getPlate(), response.getPlate());
            assertEquals(car.getKilometer(), response.getKilometer());
            assertEquals(car.getImage(), response.getImage());
        }
    }

    @Test
    void getById_Car_Success() {
        // Arrange
        int carId = 1;
        Car mockedCar = new Car(1, new Model(), new Color(), 2022, BigDecimal.valueOf(100), "ABC123", 50000, "image1");
        when(carRepository.findById(carId)).thenReturn(Optional.of(mockedCar));

        GetCarResponse expectedResponse = new GetCarResponse();
        expectedResponse.setId(1);
        expectedResponse.setModelName(mockedCar.getModel().getName());
        expectedResponse.setColorName(mockedCar.getColor().getName());
        expectedResponse.setYear(mockedCar.getYear());
        expectedResponse.setDailyPrice(mockedCar.getDailyPrice());
        expectedResponse.setPlate(mockedCar.getPlate());
        expectedResponse.setKilometer(mockedCar.getKilometer());
        expectedResponse.setImage(mockedCar.getImage());


        // Act
        GetCarResponse actualResponse = carManager.getById(carId);

        // Assert
        assertNotNull(actualResponse);
        assertEquals(expectedResponse.getId(), actualResponse.getId());
        assertEquals(expectedResponse.getModelName(), actualResponse.getModelName());
        assertEquals(expectedResponse.getColorName(), actualResponse.getColorName());
        assertEquals(expectedResponse.getYear(), actualResponse.getYear());
        assertEquals(expectedResponse.getDailyPrice(), actualResponse.getDailyPrice());
        assertEquals(expectedResponse.getPlate(), actualResponse.getPlate());
        assertEquals(expectedResponse.getKilometer(), actualResponse.getKilometer());
        assertEquals(expectedResponse.getImage(), actualResponse.getImage());
    }

    @Test
    void existsById_ReturnsTrueWhenCarExists() {
        // Arrange
        int carId = 1;
        when(carRepository.existsById(carId)).thenReturn(true);

        // Act
        boolean result = carManager.existsById(carId);

        // Assert
        assertTrue(result);
    }

    @Test
    void existsById_ReturnsFalseWhenCarDoesNotExist() {
        // Arrange
        int carId = 1;
        when(carRepository.existsById(carId)).thenReturn(false);

        // Act
        boolean result = carManager.existsById(carId);

        // Assert
        assertFalse(result);
    }
    @Test
    void getOriginalCarById_CarExists_ReturnsCar() {
        // Arrange
        int carId = 1;
        Car expectedCar = new Car(carId, new Model(), new Color(), 2022, BigDecimal.valueOf(100), "ABC123", 50000, "image1");
        when(carRepository.findById(carId)).thenReturn(Optional.of(expectedCar));

        // Act
        Car result = carManager.getOriginalCarById(carId);

        // Assert
        assertNotNull(result);
        assertEquals(expectedCar, result);
    }

    @Test
    void getOriginalCarById_CarDoesNotExist_ThrowsException() {
        // Arrange
        int carId = 1;
        when(carRepository.findById(carId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(BusinessException.class, () -> carManager.getOriginalCarById(carId));
    }




    @Test
    void getRentableCars() {

        Car car = new Car();
        // Assuming you have a method to add rentals to a car
        car.setRentals(new ArrayList<>());
        car.addRental(new Rental(LocalDate.parse("2024-01-28"), LocalDate.parse("2024-01-30")));


        // Create a request that overlaps with an existing rental
        CreateRentableCarRequest overlappingRequest = new CreateRentableCarRequest(
                LocalDate.parse("2024-01-23"),
                LocalDate.parse("2024-01-27")
        );

        // Test the isReservable method
        boolean result = carManager.isReservable(car, overlappingRequest);

        // Assert that the result is false because there is an overlap
        assertTrue(result, "The car should not be reservable for overlapping dates");
    }
    @Test
    void getRentableCarsv2() {

        Car car = new Car();
        // Assuming you have a method to add rentals to a car
        car.setRentals(new ArrayList<>());
        car.addRental(new Rental(LocalDate.parse("2024-01-23"), LocalDate.parse("2024-01-26")));


        // Create a request that overlaps with an existing rental
        CreateRentableCarRequest overlappingRequest = new CreateRentableCarRequest(
                LocalDate.parse("2024-01-27"),
                LocalDate.parse("2024-01-28")
        );

        // Test the isReservable method
        boolean result = carManager.isReservable(car, overlappingRequest);

        // Assert that the result is false because there is an overlap
        assertTrue(result, "The car should not be reservable for overlapping dates");
    }
    @Test
    void getAllViaPage_ReturnsCarsPage() {
        // Arrange
        Pageable pageable = PageRequest.of(0, 10); // İlk 10 arabayı al

        // Mock carRepository.findAll() metodu
        List<Car> carList = Arrays.asList(
                new Car(1, new Model(), new Color(), 2022, BigDecimal.valueOf(100), "ABC123", 50000, "image1"),
                new Car(2, new Model(), new Color(), 2023, BigDecimal.valueOf(150), "DEF456", 60000, "image2")
        );
        Page<Car> carPage = new PageImpl<>(carList);
        when(carRepository.findAll(pageable)).thenReturn(carPage);

        // Mock mapperService.forResponse().map() metodu
        GetCarResponse response1 = new GetCarResponse();
        GetCarResponse response2 = new GetCarResponse();


        // Act
        Page<GetCarResponse> result = carManager.getAllViaPage(pageable);

        // Assert
        assertNotNull(result);
        assertEquals(2, result.getContent().size());
        assertNotEquals(response1, result.getContent().get(0));
        assertNotEquals(response2, result.getContent().get(1));
    }
    @Test
    void getRentableCars_ReturnsRentableCars() {
        // Arrange
        CreateRentableCarRequest request = new CreateRentableCarRequest();
        request.setStartDate(LocalDate.now().plusDays(1)); // Bir sonraki gün
        request.setEndDate(LocalDate.now().plusDays(10)); // 10 gün sonrası

        // Mock rentalRules.checkIsDateBeforeNow() metodu
        doNothing().when(rentalRules).checkIsDateBeforeNow(any(LocalDate.class));

        // Mock rentalRules.checkEndDateIsBeforeStartDate() metodu
        doNothing().when(rentalRules).checkEndDateIsBeforeStartDate(any(LocalDate.class), any(LocalDate.class));

        // Mock rentalRules.checkIsRentalDateLongerThan25Days() metodu
        doNothing().when(rentalRules).checkIsRentalDateLongerThan25Days(any(LocalDate.class), any(LocalDate.class));

        // Mock carRepository.findAll() metodu
        List<Car> carList = Arrays.asList(
                new Car(1, new Model(), new Color(), 2022, BigDecimal.valueOf(100), "ABC123", 50000, "image1"),
                new Car(2, new Model(), new Color(), 2023, BigDecimal.valueOf(150), "DEF456", 60000, "image2")
        );
        when(carRepository.findAll()).thenReturn(carList);

        // Mock mapperService.forResponse().map() metodu


        // Act
        List<GetCarResponse> result = carManager.getRentableCars(request);

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
    }












    @Test
    void testReservableForOverlappingDates() {
        Car car = new Car();
        car.setRentals(new ArrayList<>());
        car.addRental(new Rental(LocalDate.parse("2024-01-01"), LocalDate.parse("2024-01-10")));
        car.addRental(new Rental(LocalDate.parse("2024-02-01"), LocalDate.parse("2024-02-10")));

        CreateRentableCarRequest overlappingRequest = new CreateRentableCarRequest(
                LocalDate.parse("2023-01-01"),
                LocalDate.parse("2024-03-15")
        );

        boolean result = carManager.isReservable(car, overlappingRequest);

        assertFalse(result, "The car should not be reservable for overlapping dates");
    }

    @Test
    void testReservableForNonOverlappingDates() {
        Car car = new Car();
        car.setRentals(new ArrayList<>());
        car.addRental(new Rental(LocalDate.parse("2024-01-01"), LocalDate.parse("2024-01-10")));
        car.addRental(new Rental(LocalDate.parse("2024-02-01"), LocalDate.parse("2024-02-10")));

        CreateRentableCarRequest nonOverlappingRequest = new CreateRentableCarRequest(
                LocalDate.parse("2024-03-01"),
                LocalDate.parse("2024-03-10")
        );

        boolean result = carManager.isReservable(car, nonOverlappingRequest);

        assertTrue(result, "The car should be reservable for non-overlapping dates");
    }

    @Test
    void testReservableForEmptyRentals() {
        Car car = new Car();
        car.setRentals(new ArrayList<>());

        CreateRentableCarRequest request = new CreateRentableCarRequest(
                LocalDate.parse("2024-01-01"),
                LocalDate.parse("2024-01-10")
        );

        boolean result = carManager.isReservable(car, request);

        assertTrue(result, "The car should be reservable when there are no existing rentals");
    }
}