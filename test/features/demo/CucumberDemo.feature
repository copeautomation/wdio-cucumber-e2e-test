#@demo
Feature: Cucumber Demo
    I can have more info about the feature...
    I can have more info about the feature...
    I can have more info about the feature...
    I can have more info about the feature...
    - Questions/clarification
    - Known issues
    - Todo


    Background: Launch google page
    Given Google page is opened

    Scenario: Scenario name
        When Search with WDIO
        Then Click on the first search result
        * URL should match https://webdriver.io/

    Scenario: Scenario name
        When Search with webdriverio
        Then Click on the first search result
        * URL should match https://webdriver.io/

