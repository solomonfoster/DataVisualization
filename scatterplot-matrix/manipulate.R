library(dplyr)
setwd("~/Desktop/DataVis/scatterplot-matrix")


abNYC <- read.csv("new-york-city-airbnb-open-data/AB_NYC_2019.csv")
abNYC <- abNYC %>%
  select(neighbourhood, price, availability_365, reviews_per_month, minimum_nights) %>%
  group_by(neighbourhood) %>%
  mutate(avg_price = sum(price)/n(),
         avg_avail_365 = sum(availability_365)/n(),
         avg_min_nights = sum(minimum_nights)/n()) %>%
  select(-price, -availability_365, -reviews_per_month, -minimum_nights) %>%
  distinct(neighbourhood, .keep_all = TRUE)

write.csv(x = abNYC, file = "NYC_AB.csv", row.names = FALSE)
