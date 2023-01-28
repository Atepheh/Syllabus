package pl.rstrzalkowski.syllabus.grade.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.rstrzalkowski.syllabus.grade.domain.exception.GradeNotFoundException;
import pl.rstrzalkowski.syllabus.grade.domain.model.Grade;
import pl.rstrzalkowski.syllabus.grade.domain.repository.GradeRepository;

@Service
@RequiredArgsConstructor
public class GradeQueryService {

    private final GradeRepository gradeRepository;

    public Page<Grade> getAllActiveByStudent(Long studentId, Pageable pageable) {
        return gradeRepository.findAllByArchivedAndStudentId(false, studentId, pageable);
    }


    public Page<Grade> getAllArchivedByStudent(Long studentId, Pageable pageable) {
        return gradeRepository.findAllByArchivedAndStudentId(true, studentId, pageable);
    }

    public Grade getByActivityAndStudent(Long activityId, Long studentId) {
        return gradeRepository.findByActivityIdAndStudentId(activityId, studentId)
                .orElseThrow(GradeNotFoundException::new);
    }

    public Grade getById(Long id) {
        return gradeRepository.findById(id)
                .orElseThrow(GradeNotFoundException::new);
    }
}
