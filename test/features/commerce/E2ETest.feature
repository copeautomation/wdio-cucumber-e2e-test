Feature: Customer search

    @demo @smoke @debug
    Scenario Outline: <TestID>: Search external customers
        Given Get list of users from reqres.in
        When Ann as Admin user login to nopcommerce site
        Then Verify if all users exist in customers list
        # Then Validate DB result

        Examples:
            | TestID    |
            | E2E_TC001 |

