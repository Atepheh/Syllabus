package pl.rstrzalkowski.syllabus.infrastructure.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.rstrzalkowski.syllabus.domain.exception.user.UserNotFoundException;
import pl.rstrzalkowski.syllabus.domain.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByUsername(email)
                .orElseThrow(UserNotFoundException::new);
    }
}
