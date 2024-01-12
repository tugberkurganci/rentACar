package com.tobeto.pair3.core.utils.mapper;

import org.modelmapper.ModelMapper;

public interface ModelMapperService {

    public ModelMapper forResponse( );

    public ModelMapper forRequest( );
}
