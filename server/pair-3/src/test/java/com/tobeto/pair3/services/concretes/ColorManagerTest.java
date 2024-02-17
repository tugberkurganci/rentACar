package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.messages.Messages;
import com.tobeto.pair3.core.utils.mapper.ModelMapperManager;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Color;
import com.tobeto.pair3.repositories.ColorRepository;
import com.tobeto.pair3.services.dtos.requests.CreateColorRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateColorRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllColorResponse;
import com.tobeto.pair3.services.dtos.responses.GetColorResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class ColorManagerTest {

    private ColorManager colorManager;

    private ModelMapperService mapperService=new ModelMapperManager(new ModelMapper());

    @Mock
    private ColorRepository colorRepository;

    @BeforeEach
    void setUp() {

        colorManager = new ColorManager(colorRepository,mapperService);
    }



    @Test
    void add_NewColor_Success() {
        CreateColorRequest createColorRequest = new CreateColorRequest();
        createColorRequest.setName("Red"); // Örnek bir renk adı


        when(colorRepository.save(any(Color.class))).thenReturn(new Color());

        // colorService.add metodunu çağırın
        colorManager.add(createColorRequest);

        // colorRepository.save metodunun bir kez çağrıldığını kontrol edin
        verify(colorRepository, times(1)).save(any(Color.class));
    }
    @Test
    void add_ExistingColor_ThrowsException() {
        CreateColorRequest createColorRequest = new CreateColorRequest();
        createColorRequest.setName("Red"); // Örnek bir renk adı

        // Renk mevcut, BusinessException fırlatılmalı
        when(colorRepository.existsByName("Red")).thenReturn(true);

        // colorService.add metodunu çağırın, BusinessException bekleniyor
        assertThrows(BusinessException.class, () -> colorManager.add(createColorRequest));

        // colorRepository.save metodunun çağrılmadığını doğrulayın
        verify(colorRepository, never()).save(any(Color.class));
    }

    @Test
    void update() {

        UpdateColorRequest updateColorRequest = new UpdateColorRequest();
        updateColorRequest.setId(1); // Renk kimliği
        updateColorRequest.setName("Blue"); // Güncellenmiş renk adı

        // Renk nesnesini mocklayın
        Color color = new Color();
        color.setId(1);
        color.setName("Red"); // Eski renk adı

        // colorRepository.getById metodunun çağrılması durumunda bir değer döndürmesini sağlayın
        when(colorRepository.findById(1)).thenReturn(Optional.of(color));


        // colorRepository.save metodunun çağırılması durumunda bir değer döndürmesini sağlayın
        when(colorRepository.save(any(Color.class))).thenReturn(color);

        // colorService.update metodunu çağırın
        colorManager.update(updateColorRequest);


        // colorRepository.save metodunun bir kez çağrıldığını kontrol edin
        verify(colorRepository, times(1)).save(color);

    }


    @Test
    void delete() {
        // Test verilerini hazırlayın
        int colorId = 1;

        // colorRepository.getById metodunun çağrılması durumunda bir değer döndürmesini sağlayın
        Color color = new Color();
        when(colorRepository.findById(colorId)).thenReturn(Optional.of(color));

        // colorService.delete metodunu çağırın
        colorManager.delete(colorId);

        // colorRepository.delete metodunun bir kez çağrıldığını kontrol edin
        verify(colorRepository, times(1)).delete(color);
    }
    @Test
    void getAll() {
        // Test verilerini hazırlayın
        List<Color> colorList = Arrays.asList(
                new Color(1, "Red"),
                new Color(2, "Blue"),
                new Color(3, "Green")
        );

        // colorRepository.findAll metodunun çağrılması durumunda bir liste döndürmesini sağlayın
        when(colorRepository.findAll()).thenReturn(colorList);

        // Renk nesnelerinin doğru şekilde GetAllColorResponse nesnelerine dönüştürülüp dönüştürülmediğini kontrol edin
        List<GetAllColorResponse> responseList = colorManager.getAll();

        // Doğru sayıda GetAllColorResponse nesnesi döndürüldüğünü kontrol edin
        assertEquals(colorList.size(), responseList.size());

        // Her bir GetAllColorResponse nesnesinin doğru şekilde dönüştürüldüğünü kontrol edin
        for (int i = 0; i < colorList.size(); i++) {
            Color color = colorList.get(i);
            GetAllColorResponse response = responseList.get(i);
            assertEquals(color.getId(), response.getId());
            assertEquals(color.getName(), response.getName());
        }
    }

    @Test
    void getById() {

        // Test verilerini hazırlayın
        int colorId = 1;
        Color color = new Color(colorId, "Red");

        // colorRepository.getById metodunun çağrılması durumunda bir değer döndürmesini sağlayın
        when(colorRepository.findById(colorId)).thenReturn(Optional.of(color));

        // Renk nesnesinin doğru şekilde GetColorResponse nesnesine dönüştürülüp dönüştürülmediğini kontrol edin
        GetColorResponse response = colorManager.getById(colorId);

        // Doğru GetColorResponse nesnesi döndürüldüğünü ve dönüşümün doğru olduğunu kontrol edin
        assertEquals(colorId, response.getId());
        assertEquals("Red", response.getName());
    }

    @Test
    void getOriginalColorById_ExistingColor_ReturnsColor() {
        // Test verilerini hazırlayın
        int colorId = 1;
        Color color = new Color(colorId, "Red");

        // colorRepository.findById metodunun çağrılması durumunda bir değer döndürmesini sağlayın
        when(colorRepository.findById(colorId)).thenReturn(Optional.of(color));

        // Renk nesnesinin doğru şekilde döndürüldüğünü kontrol edin
        Color result = colorManager.getOriginalColorById(colorId);

        // Doğru renk nesnesi döndürüldüğünü kontrol edin
        assertEquals(color, result);
    }

    @Test
    void getOriginalColorById_NonExistingColor_ThrowsException() {
        // Test verilerini hazırlayın
        int colorId = 1;

        // colorRepository.findById metodunun çağrılması durumunda null döndürmesini sağlayın
        when(colorRepository.findById(colorId)).thenReturn(Optional.empty());

        // BusinessException bekleniyor
        BusinessException exception = assertThrows(BusinessException.class, () -> colorManager.getOriginalColorById(colorId));

        // Doğru hata mesajının fırlatıldığını kontrol edin
        String expectedMessage = Messages.getMessageForLocale("rentACar.exception.color.notfound", LocaleContextHolder.getLocale());
        assertEquals(expectedMessage, exception.getMessage());
    }
}