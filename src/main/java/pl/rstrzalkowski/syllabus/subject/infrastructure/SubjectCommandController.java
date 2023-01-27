package pl.rstrzalkowski.syllabus.subject.infrastructure;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import pl.rstrzalkowski.syllabus.subject.application.SubjectCommandHandler;
import pl.rstrzalkowski.syllabus.subject.application.command.ArchiveSubjectCommand;
import pl.rstrzalkowski.syllabus.subject.application.command.CreateSubjectCommand;
import pl.rstrzalkowski.syllabus.subject.application.command.UpdateSubjectCommand;

@RestController
@RequestMapping("/subjects")
@RequiredArgsConstructor
public class SubjectCommandController {

    private final SubjectCommandHandler subjectCommandHandler;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void createSubject(@Valid @RequestBody CreateSubjectCommand command) {
        subjectCommandHandler.handle(command);
    }

    @PutMapping
    public void updateSubject(@Valid @RequestBody UpdateSubjectCommand command) {
        subjectCommandHandler.handle(command);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void archiveById(@PathVariable("id") Long id) {
        subjectCommandHandler.handle(new ArchiveSubjectCommand(id));
    }
}
