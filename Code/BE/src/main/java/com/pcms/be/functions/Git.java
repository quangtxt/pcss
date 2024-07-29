package com.pcms.be.functions;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public interface Git {
    interface GitSrc{
        String repositoryTree = "https://gitlab.com/api/v4/projects/_projectId-txt_/repository/tree";
        String repositorySubTree = "https://gitlab.com/api/v4/projects/_projectId-txt_/repository/tree?path=Report/_SubtreeName-txt_";
    }
    interface GitNameFile{
        List<String> listNameRootFolder = new ArrayList<>(Arrays.asList("Report","Code"));
        String rootFileRoport = "Report";
    }
}
