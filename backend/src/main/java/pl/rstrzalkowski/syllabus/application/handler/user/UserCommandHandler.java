package pl.rstrzalkowski.syllabus.application.handler.user;

import pl.rstrzalkowski.syllabus.application.command.user.ArchiveUserCommand;
import pl.rstrzalkowski.syllabus.application.command.user.ChangePasswordCommand;
import pl.rstrzalkowski.syllabus.application.command.user.GenerateRegistrationTokensCommand;
import pl.rstrzalkowski.syllabus.application.command.user.UpdateDescriptionCommand;
import pl.rstrzalkowski.syllabus.application.command.user.UpdateUserCommand;
import pl.rstrzalkowski.syllabus.domain.model.RegistrationToken;

import java.util.List;

public interface UserCommandHandler {

    void handle(UpdateUserCommand command);

    void handle(ArchiveUserCommand command);

    List<RegistrationToken> handle(GenerateRegistrationTokensCommand command);

    void handle(UpdateDescriptionCommand command);

    void handle(ChangePasswordCommand command);
}
