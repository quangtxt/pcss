package com.pcms.be.service.impl;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.EditMentorProfileRequest;
import com.pcms.be.pojo.response.MentorProfileResponse;
import com.pcms.be.pojo.response.StudentProfileResponse;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MentorServiceImpl implements MentorService {
    private final ModelMapper modelMapper;
    @Autowired
    private UserRepository userRepository;
    @Override
    public MentorProfileResponse getMentorProfile(int Id) throws ServiceException {
        Optional<User> user = userRepository.findById((long) Id);
        if (user.isEmpty()){
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }else {
            User infoUser = user.orElseThrow();
            if (infoUser.getMentor() == null) {
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
            MentorProfileResponse mentorProfileResponse = new MentorProfileResponse();
            mentorProfileResponse.setFptEmail(infoUser.getEmail());
            mentorProfileResponse.setPersionalEmail(infoUser.getMentor().getPersonalEmail());
            mentorProfileResponse.setPhone(infoUser.getMentor().getPhone());
            mentorProfileResponse.setFullName(infoUser.getName());
            return mentorProfileResponse;
        }
    }

    @Override
    public MentorProfileResponse editMentorProfile(EditMentorProfileRequest editMentorProfileRequest) throws ServiceException {
        Optional<User> user = userRepository.findById(editMentorProfileRequest.getUserId());
        if (user.isEmpty()){
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }else{
            User infoUser = user.orElseThrow();
            if (infoUser.getMentor() == null){
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
            infoUser.setName(editMentorProfileRequest.getFullName());
            infoUser.setEmail(editMentorProfileRequest.getFptEmail());
            infoUser.getMentor().setPersonalEmail(editMentorProfileRequest.getPersionalEmail());
            infoUser.getMentor().setPhone(editMentorProfileRequest.getPhone());
            userRepository.save(infoUser);
            MentorProfileResponse mentorProfileResponse = new MentorProfileResponse();
            mentorProfileResponse.setFptEmail(infoUser.getEmail());
            mentorProfileResponse.setPersionalEmail(infoUser.getMentor().getPersonalEmail());
            mentorProfileResponse.setPhone(infoUser.getMentor().getPhone());
            mentorProfileResponse.setFullName(infoUser.getName());

            return mentorProfileResponse;
        }
    }
    }

