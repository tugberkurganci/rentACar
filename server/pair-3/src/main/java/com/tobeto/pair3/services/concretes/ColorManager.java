package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.messages.Messages;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Brand;
import com.tobeto.pair3.entities.Color;
import com.tobeto.pair3.repositories.ColorRepository;
import com.tobeto.pair3.services.abstracts.ColorService;
import com.tobeto.pair3.services.dtos.requests.CreateColorRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateColorRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetAllColorResponse;
import com.tobeto.pair3.services.dtos.responses.GetColorResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor

public class ColorManager implements ColorService {
    private final ColorRepository colorRepository;
    private final ModelMapperService mapperService;

    @Override

    public void add(CreateColorRequest createColorRequest) {
        if(colorRepository.existsByName(createColorRequest.getName())){
            throw new BusinessException(Messages.getMessageForLocale("rentACar.exception.color.exists", LocaleContextHolder.getLocale()));
        }

        Color color = mapperService.forRequest().map(createColorRequest, Color.class);
        colorRepository.save(color);
    }

    @Override
    public void update(UpdateColorRequest updateColorRequest) {
        Color color=colorRepository.findById(updateColorRequest.getId()).orElseThrow();
        mapperService.forRequest().map(updateColorRequest, color);
        colorRepository.save(color);
    }

    @Override
    public void delete(int id) {
        Color color = colorRepository.findById(id).orElseThrow();
        colorRepository.delete(color);
    }


    public List<GetAllColorResponse> getAll() {
        List<Color> colorList = colorRepository.findAll();

        List<GetAllColorResponse> responseList = colorList.stream().map(
                color -> mapperService.forResponse().map(color, GetAllColorResponse.class)
        ).toList();
        return responseList;
    }

    @Override
    public Color getOriginalColorById(int colorId) {
        return colorRepository.findById(colorId).orElseThrow(() ->
                new BusinessException(Messages.getMessageForLocale("rentACar.exception.color.notfound", LocaleContextHolder.getLocale()))
 );
    }

    @Override
    public GetColorResponse getById(int id) {
        Color color  = colorRepository.findById(id).orElseThrow();
        GetColorResponse response = mapperService.forResponse().map(color,GetColorResponse.class);
        return response;
    }

    @Override
    public boolean existsColorById(Integer id) {
        return colorRepository.existsById(id);
    }
}
