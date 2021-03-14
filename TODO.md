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
- Add/Edit?/Delete transaction:
  - Fields:
    - Datetime
    - Note
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
    - Categories
    - Compare <=>
    - Total
    - Status: waiting, on track, warning, failed, completed, abandoned
  - Add/Edit/Abandoned
  - Search target by: name, date
- Global config:
  - Currency
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
- Sync data across devices?
  - Resolve conflict: like git, with forced rebase

## Other requirements

- Lang: en, vi
- PWA: Work locally, installable
- Responsive (Mobile, Desktop, Tablet?)

## Technologies

- IndexedDB
- React
- Less
- Typescript

## DB Design

- Category:
  - Title: string unique
  - Parent title: string

- Transaction:
  - Spending Datetime: datetime, timezone utc, indexed, default now
  - Note: string, non-empty, stripped, locale-aware
  - Note words: [string], calculated from title, lowercase, remove accents
  - Categories: [string], hierarchy enforced by application layer, default cat
  - Price: float
  - Is unexpected: bool, default false
  - Updated at: datetime ??
  - Deleted at: datetime ??
  - Id: timestamp

- Transaction History: ??
  - Transaction id
  - Field: string
  - Old content
  - New content
  - Id: timestamp

- Global Config:
  - Key: string
  - Value: any

- Target
  - Title
  - Title words?
  - Start date
  - End date
  - Categories [string]
  - Include unexpected: bool
  - Compare enum <=>
  - Total float
  - Status enum waiting, on track, warning, failed, completed, abandoned
  - Id: timestamp

## Roadmap

- Mobile version, without sync
  - v1
    - Design UI
    - Bootstrap project
      - Basic layout
      - Some global config
      - Language
    - Add / delete transactions
    - Add / delete categories
  - Search transaction
  - Target
  - Report
  - Import export data  
  - Homepage
  - Legal notice  
  - Polish + optimize
  
- BE for sync across devices

- Desktop version?

- Small features
  - Quick record
  - Voice API?
  - Reminder to record spending
  - Scheduled transaction
  - Password protection
  
## UX design

- Color
  - Red - error: #ff6053
  - Yellow - warning: #ffa957
  - Blue - info: 5AB1BB
  - Green - success: 94C9A9
  - Primary: #393e5b
  - Background: #ede6cb
- Font: raleway
- Icon: Font awesome
- Chart: nivo