# TODO

---

## Features

- Category hierarchy:
    - Action:
        - Add
        - Rename?
        - Delete? (What about transactions with this category)
    - Constraint:
        - a belongs to cat A, A is sub cat of B, then a belongs to B
        - a transaction can belong to a non-leaf cat
- Add/Edit/Delete transaction:
    - Fields:
        - Datetime
        - Name
        - Categories (follow one branch in the hierarchy)
        - Price
        - Daily spending / Unexpected spending Flag
- Search transaction by every fields
- Report:
    - Select time period:
        - This week vs last week/average
        - This month vs last month/average
        - This year vs last year/average
        - Custom ?
    - Select categories
    - Generate report:
        - Time series
        - Percent by categories
        - List all item bought
        - Relevant targets?
        - Save report as img/pdf?
- Target:   
    - Fields:
        - Name
        - Start date
        - End date
        - Category
        - Compare <=>
        - Total
        - Status: waiting, on track, warning, failed, completed, abandoned
    - Add/Edit/Abandoned
    - Search target by: name, date
- Global config:
    - Currency
    - Dark theme
    - Password? Fingerprint??
    - Multiple profile per device? Add/Delete profile
- Reminder to record spending??:
    - Schedule: never, daily, every 2 days, weekly
- Scheduled transaction:
    - Fields:
        - ...Same as transaction
        - Name template
        - Schedule:
            - Daily: what time
            - Weekly: what day/time
            - Monthly: what date/time
            - Yearly: what date/time
    - Add/Edit/Delete
- Quick record
  - Take a picture
  - Convert to transaction later
- Sync data across devices?

## Other requirements

- Lang: en, vi
- PWA: Work locally, installable
- Responsive (Mobile, Desktop, Tablet?)

## Technologies

- IndexedDB
- React
- Ant design
- Typescript