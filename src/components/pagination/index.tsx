import { ThemeType } from '@/theme';
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, IBoxProps, Pressable, Text, useTheme } from 'native-base';
import React, { useMemo } from 'react';

interface PropsInterface extends IBoxProps {
  currentPage: number;
  totalPage?: number;
  rangePageToShow?: number;
  onPressPageItem?: (pageNumber: number) => void;
}

function Pagination(props: PropsInterface) {
  const theme = useTheme<ThemeType>();

  const {
    currentPage,
    totalPage = -1,
    rangePageToShow = 0,
    onPressPageItem = () => {},
    ...restProps
  } = props;

  const prevPage = useMemo<number>(() => {
    if (currentPage >= 2) {
      return currentPage - 1;
    }

    return -1;
  }, [currentPage]);

  const nextPage = useMemo<number>(() => {
    if (totalPage < 0 || currentPage < totalPage) {
      return currentPage + 1;
    }

    return -1;
  }, [currentPage, totalPage]);

  const renderCallback = (cb: () => React.ReactNode) => {
    return cb();
  };

  return (
    <>
      {totalPage !== 1 && (
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          {...restProps}
        >
          {/* Prev page */}
          {prevPage > 0 && (
            <Pressable
              onPress={() => {
                onPressPageItem(prevPage);
              }}
              mx={1}
              borderWidth={1}
              w={8}
              h={8}
              alignItems="center"
              justifyContent="center"
              borderColor="blueGray.600"
              borderRadius="full"
            >
              <FontAwesomeIcon icon={faChevronLeft} size={14} color={theme.colors.text} />
            </Pressable>
          )}

          {/* first page */}
          {currentPage > rangePageToShow + 1 && (
            <Pressable
              onPress={() => {
                onPressPageItem(1);
              }}
              mx={1}
              borderWidth={1}
              w={8}
              h={8}
              alignItems="center"
              justifyContent="center"
              borderColor="blueGray.600"
              borderRadius="full"
            >
              <Text fontSize="xs">1</Text>
            </Pressable>
          )}

          {/* Prev dot ... */}
          {currentPage > rangePageToShow + 2 && (
            <Text mx={1} fontSize="xs">
              ...
            </Text>
          )}

          {/* Prev number page */}
          {renderCallback(() => {
            const items = [];
            for (let i = rangePageToShow; i >= 1; i--) {
              const newPage = currentPage - i;
              if (newPage >= 1) {
                items.push(
                  <Pressable
                    key={i}
                    onPress={() => {
                      onPressPageItem(newPage);
                    }}
                    mx={1}
                    borderWidth={1}
                    w={8}
                    h={8}
                    alignItems="center"
                    justifyContent="center"
                    borderColor="blueGray.600"
                    borderRadius="full"
                  >
                    <Text fontSize="xs">{newPage}</Text>
                  </Pressable>,
                );
              }
            }

            return items;
          })}

          {/* Active page */}
          <Pressable
            mx={1}
            borderWidth={1}
            w={8}
            h={8}
            alignItems="center"
            justifyContent="center"
            borderColor="blueGray.600"
            borderRadius="full"
            bg="blueGray.600"
          >
            <Text fontSize="xs" color="white">
              {currentPage}
            </Text>
          </Pressable>

          {/* Next number page */}
          {renderCallback(() => {
            const items = [];
            for (let i = 1; i <= rangePageToShow; i++) {
              const newPage = currentPage + i;
              if (newPage >= 1 && newPage <= totalPage) {
                items.push(
                  <Pressable
                    key={i}
                    onPress={() => {
                      onPressPageItem(newPage);
                    }}
                    mx={1}
                    borderWidth={1}
                    w={8}
                    h={8}
                    alignItems="center"
                    justifyContent="center"
                    borderColor="blueGray.600"
                    borderRadius="full"
                  >
                    <Text fontSize="xs">{newPage}</Text>
                  </Pressable>,
                );
              }
            }

            return items;
          })}

          {/* Show extend 1 page if you don't know total page (totalPage < -1) */}
          {totalPage < 0 && (
            <Pressable
              onPress={() => {
                onPressPageItem(currentPage + 1);
              }}
              mx={1}
              borderWidth={1}
              w={8}
              h={8}
              alignItems="center"
              justifyContent="center"
              borderColor="blueGray.600"
              borderRadius="full"
            >
              <Text fontSize="xs">{currentPage + 1}</Text>
            </Pressable>
          )}

          {/* Next dot ... */}
          {(currentPage < totalPage - rangePageToShow - 1 || totalPage < 0) && (
            <Text mx={1} fontSize="xs">
              ...
            </Text>
          )}

          {/* Last page */}
          {currentPage < totalPage - rangePageToShow && (
            <Pressable
              onPress={() => {
                onPressPageItem(totalPage);
              }}
              mx={1}
              borderWidth={1}
              w={8}
              h={8}
              alignItems="center"
              justifyContent="center"
              borderColor="blueGray.600"
              borderRadius="full"
            >
              <Text fontSize="xs">{totalPage}</Text>
            </Pressable>
          )}

          {/* Next page */}
          {nextPage > 0 && (
            <Pressable
              onPress={() => {
                onPressPageItem(nextPage);
              }}
              mx={1}
              borderWidth={1}
              w={8}
              h={8}
              alignItems="center"
              justifyContent="center"
              borderColor="blueGray.600"
              borderRadius="full"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                size={16}
                color={theme.colors.text}
              />
            </Pressable>
          )}
        </Box>
      )}
    </>
  );
}

export default React.memo(Pagination);
