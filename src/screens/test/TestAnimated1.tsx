import React, { useRef, useState } from 'react';
import { Box, Pressable } from 'native-base';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Header from '../../components/header';

const dataImage = [
  {
    id: 1,
    title: 'Da lat 1',
    url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhMVFhUXFxUVFxUVFxcVFRUVFRUXFxUVFxcYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQAGB//EAEEQAAICAQMCBAMFBQUGBwEAAAECABEDBBIhBTETIkFRBmFxFDKBkaFSYrHB0RVCcoLwIyRDU7LxM3OSosLS4Qf/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMEAAUG/8QANREAAQQABAMGBQMDBQAAAAAAAQACAxEEEiExE0FRYXGBocHwIjKRseEFFNFCUvEzYoKSsv/aAAwDAQACEQMRAD8AXbS13gDjno8+mBieXRek+wBY4L45wmYdCVj7IMp8psPpAIjmSdwmHkh+5laaJSm2QRDeHI8OTdDewWpmKA3KAEltkOMUsuOMzDtbuoyY5x+VL7ZBWO+FKnBK8JoUf3bzqkqkFY22EwRx/KQMJtbG4tpG+qXKTtsYOKd4coIGqTsW7kl6l0yGEKSBilWtrQKDpM2pUVcuqywWTtlLUrVKkFZcrINxkQeqoRIqFlanWiOxDqVqEKyKhRtDInVLETpyIQzIIhSIOpyNqhErUKRKkQJkMyCJcidFTg9UIiVIhCJDCIUUOdJnRV1r6c+KUOGaT4YJsc8gSL1HRrKyaeKZNEJtPjgWxzQyYhZpMO124WK2mUSn2UTTzYYIpU0CXRY3QDmNFm5NJBjFHy4kHGDKB55qBiB+VK7JBSMHFI2Q5kCzsSpSDOONskGUjWpFqVKSpWMskoUhtJRS5WRthmSVIhtdZQ6kbYSpUiFcHKtSsJKw2mDlQrI2y9SIbTXarUrUuRIqFMChkSKhZVlnJh2IdStQpEqRORukIidLkSlQI2qESphKlagKYKkgyxE4iIU7TapUiWqdAjmX2TIsWZJoukCyz51rl77mrPZIJ8ceZYJkEsHKRas7JjimTFNd0EA2MTQyRZnx2snwakbJoPjgWSXElrM6KkrslWSNFJUrGD0hYlGSDZI4Ug2WUDlJ0aTKyjLG2WDZJQOWdzEoyym2NFINkjWoFuqWKSlRkrKlYUpCXqVIhisrtjWhqhESZapWoUwcq1K1L1OM5EOQys6XIkEQ2qWhkShELUhhBabdBIkEQhEqROJRCGBOIksJ0BKcGkMyIQrIIiWiChTpbbJiWntfbGSCdIbRZQ+JHF+ZVPPfkesllnzlkGl9IRYtJMsCVjWRYEoZUFSI1QGEC6xtkgzjlA6lMhJMkA6TSOKCbFKB6k5lrMKTtsebDBnFLCRRMdJIpKMkeOOVZI4kSGNZ7JBlI8ySjrKB6g5iQbHBlI8Ug2SVD1nfGkWSUZI6ccG2OUDgs7mJEiVKxp8cGUjrObCXKyjLDshgnUzrTbodyCJbYfaRtMOZcFWpBEKEkNihzItKERKlYXbOKQZk4KBtkVDeHOOOIXKgBKXKypSNFJGyKXhVERKWCTvDjO2dtiGQKzYCl9k6MbZ0Tiq3B7F7Lpvxbp8WMI4YEewu/wAzEH+OH32ANl/doWV+vvPKZ/8AaNfAJ9u0t/Y+WrCn6jsZgpmYnLdr0AHZQC6q8F9I0vxLpcgF5AhPFNx+vaa2MBhakEe4Nj8xPjj6PKvdT+U0ek9RzpSqzAAg7fSTMTCdDXn+U2Z4Fmj5fj7L6kcUGcUP0rN42JclUT3HsR3jB08zFxBIKvlsWFnnHKNjmicEG2GMJEpYstscocM0mwwZxSgkUyxZ5wQWTDU0zgMU6gNiFiLr0947X2aSOjoWs/IsXd6HaZWt6zkJpAB9RZiLdTzj7x/Qf0msUNyshY92wW3l1IHFG/YSranH+0B9Yvi6jjZRuFH34kPpUyco6Fu9XX6SmZtKHDfeqcRQ33SD9JJ00DpNHlxsCKIPcTcTn0k3TVsnZhs24WOdLI+yTbOCDbDFGKTfsh0WKdJKPpRNhsMC+P6RxiCkODHRZDacRTV5FUe5jmuUmxYr2Ey20BMZ07q0QZhGH5kNeoj1XmCydRo/d4jB6TFcvTGkziJKWkYSC0ROpITyCP1jSMrDggzFy6UiV07MhsQDEu5ouwLP6VvbJGydgzBxxCFYxm7Ugw3YgFJUrGNsqREMqo2BB2ypEszgesH46+8TiKoiVOZMpYnRc6pwwvcD4JUc3c1dF0041C9wPQ1/oR/B8SaRl3DJXyIIMLpeqYMv3Mik+3Zr+h7zzHTSAajyW4QMJ0+65unI45URNfhzEH3hBcKeqqpNlABxe4g/PgiNafq2Bu2VD+P9YomeBpaYwNJ1TOm04UUBQhvCg8erxtyuRT9HB/nDDOPcSRl11TiLRD8Cd9nkZdeiiyy/mJlaz4oxp2G78YWvLtlxjA3WodMJw04nls3xi9+RVr57iYNPifU3win5BXP85bJIp2xepzlVqwTfoBZ+te0q+NTx+naZ+g6m2TlsWxj6EEHiN5MW71o+4qSL6NFVEd6rP12PClkqhYdwOTPFdX1ONyQmKvndj8J7jXdNV+8TwdIxIQwXkcTRHiWtGtkqL8M522gXgFxofKbX3sQeTAoNA37H3nvtd07Tt3pT79r+UTy/DuMji/zlxi27qRwjlm9H6uFXw8t2OzE3x7Gbem1ONzQPPt7/AE95mL8MLfcxrF0MKbDGx2iPmjPNFkEg0pahgy0quJrs8w7ASJmVuClXWJ59MDNJiIs7iO2YjZI6Bp3WY2jHtAPpJpZcoizPKiZyiYWJM4iIJkjTkwDiNxCl4TeiVyace0WfSL7R14tnYAEmgBySeABOzohiBiwhYctEsXU8TOMYYFj2ABrtfeqvgxhm/wBGEkg1WqV1NGYnRWZ4vlaxUO6kdx35HsR7qYIwF1GiuZT2hzTYPMLNzYSIu4M1mgmQTs6fKsvxDOmh4I9p0PERyL6bi+H9MpsIefTcalm6Fp/RSPoTPOH4opRsAH+KzX6wGX4gyt/xa+QAH61PJGHxR3PmV6RmgGgo9wHrS9K/RsYvzvXzaJ/2UmQ0uS69eGr6zBxaliw8Vt4/xXf0N8Td0/Ugi1jwEL34PBPv25iyiaMD4rPhXmfRVjySX8P8+X8oHUOk48GJ82TISqCyEUFjyBwCa9Zn9O6joGZAuXJvYigw2FWYgAH52fSxwYT4q12V9LlBxhVKj1JY2woD8Z890efY2N9hNOrbrI3bWBK327fxMeEyvYc7zfKiOnNRlDY3gBo8Qvr+ToIbkZCPy/jFj8OD/mE/gJXS9TfLuospB+6QBY97IMfXMKtiR8mPN+3cj8pkdiJ4/hJ16LW2CN/xACkBOiYl5ZvzI/pGMWbAh4a/kKMyPiMBcGTIpIYba9QCXUXRFdiZ5r4a63m+0IjuWV7WiVVRwTuoL34HqPX8Ha58kZdmJrw2+qUhjHhtbr6QuoU8ixBaPreHIzJjyh2St23kDddc9j2PaeD6/wDGWnyYMmLGzFmAA8hAreN33qvgNEvgrqLPmyAtd4lrgKaRlA7H2avwnNgkMZe7Svd7JXSsMrY20Qed96+pNqvnKfaR7zyvXM7fZspBIbw3ojgg7TRFes+ff2pmxgFHzCgCNzkgkd/L2q79IYYXSbH39U00jYjRC+yZgjdxcnFkrgdpnY88N9oHuJMSFVMOqaOT5TmyxF9YIB+oCVaSeSk5g6rSZ/nBs3zmY+vHpBNr5UZlFzW9VpOwgMzCZza6DfVyjQ5SOVPM4gXeItqIJs0oAVIkJx8ggWyCLplFjcCV9QDRr5Eg1F+pZsIG1snBUFh91ge5UUbI47+sfUKeiPkz8gBb3Ei7rbtV27djdV+XtR8d13CpyuzZObIogkije0fKiTfbips6XqSeFudm3qS23bW4U5NE18vQ2TMjrBxZHLYxl8zOdhAtVoeH5v7xPc8D8YL13+3qErjpskG0Q+7uJrJtqitqBbHzDyngDkevynp9Dn3IDRo7uSQeA5ABI7mvWq4i/SdJpiu5svg3u8m1n2n+4t7TamuTZPm7cGd07MAzYVIYILDgEbrazQYAgC5WMEN19/TRYZH5pcoqh7Pb9aRepvkcJiQEg5L3AkHGQNxYV6FFeweOL9Jq5+ltjwjIz2eNwP73FIQPmO/6Huro9d4bh1YABtrE/doHzBvoRfyK/KbepbINF5/K3hY91eTzeUOOOwo1+cs2nWT0XnYp8uHmiEdBrnDTa9aPZzG2q87vlC0ytVrcoak2Ec0SLFBq7gjmzA4esZOQURiBZolQBddjfrI5l7pC2NxnTH/ttv8Alr/6j/8AWdHo9F1jqtMtfrLjIZmZNZSblotx5b9TVj8LgF6jlNEKFA7km7vtV/QzU6Rjd1mbG47LS6rkPgt6WUH5usxm1BTY9Gwd1WeNpsciVy6tytOT3Tg16MPYR5OlKys23msZuz3dQTMksgJtaY2FgorV1+dnxOSbLoL5Pmujz7zzuFvMtD1HI79x39T+PaPa3qhKeEcYBCBdwIG7kEEgKOwFdzdX7xDR4zuUkGtws80BxZv5CGQg69g9e78bdzRsLbF8/wCF73Hrc5J25LPN2Bx+Jl8fxDhYKmTNjYnncp8vHILHsDMXL8QYkBCktwew9T8zxPM4sVIDVmj7/MAivapCSFkhOgHShr9VpjxD4gBZJ52SR5k/W19L63qlfSOysGDeHRHqPEU8GeC6ixVLHBH19jNbNrVGjwr3rZYFWNqG+547zK6uP9kKPcrRJAHN1ZPaQhj4Xw9T+PRVxMoldm7B6rPxa/KwKM3Debn1N+n6zb+CcpGc/wDlv/1qZiHTZQWd+SaUkUTbMe4HY+T+HvNL4VJXJdf8N77+rJUsacwtHNZ4jlka7ova9XylsGVfdGH5ip86yrww8tAXfsf2R+PFH2/P1vVdZWF+3IqjXNkD1+s8XlIrt+q+3yHyH6+8SCMx6KuJkEhtfVPHM7x5jfaz68wGfquytwAs0O55/CKMMexUdim87W+2aDLzLXWkmqN+w5mhgyKoK5EG/JxjO6vDIBYs4HoQtfU/jHED1J2Jj5lcWlC8Wz5GU0wI/gfoRwYA6mHhkLs7DqCni0qWiX2maPStE+cZChFp4fBvnxX2LVD3gILRZQtqETLYU3GrA7m2NDgX3P0ivTcozZVxBtrMwUbgas1971A59j/TS0/R8r4XzrRQCgQQbJr1XuB5uR7j5ysbc5oEf52WLFYhsLbIJu9h09O3btXmepdR3M2EEr2HYhjz3BIqj/CZDiwykNtW0bsBYu/r/Sb79A1p5GXAGPIG73787d3fgTO1XTNUjqrPZJO2rIP/ALeZbhuAOnl+V5n75sjtHAXqLJ26/LVdxKX0xL7vM3lAYkkDg9u/J+kPoUw5ndHykFceRgdvdkQuFJNDkA88nsJoYvh/Wk7Q2lJ/eBHmA5W1xVd9+fl3k6vQajEpOXJp1G1gQrt4jpVMEFgMe3pJGNzgcp200rTs0J80XY4RlrXjV1Eb6jqLa2werbB6rN0uJm2Io8zelgCzzVkgSugZkyO22wy8Wa9QYTThi9KASpoUbBI4AIB9ZXWdHy46ZlIJ5Bvn+lUZZ2rdFmjlbG/4j8RvxV9Fq3xZS7kBXyrRXjaauwSLFgEWD7+/Pr/iDWeJpsxxMCwUONh3Ggdzfd5HCOPn25up8y1OtG879zVxxVWO/r9Zo6X4jC9g/p+nb19JMShvw8iuxGBkkeydg+IUeywQR9lnZs95fNZIBWjd3u7UOb7wR1iBSNoNkU4Y2tXdDsbv1B7CD1mBnJbGjFSSRfPB9L9YodBk/YaQ4jui95oaav7rd0aaQopfUZVYjlRiBAPsDvFyJifYMn7J/wBfjOmYwvP9bvfgtgmbXyt9+K3Om4sRtWfALoFsmUAKu9fMm1C1nntyAD7yuNUQtj8bC67lclXaiEsgAlfXge89Cir+wv5CTsT9kfkJpEJs67/T33KJmBoVsgac6TJjCfaNPjPFsd9g7ySD6tS+o9wPci+k1elwuX8fFmAU7VXchYhqXgmgxG883Qr3uHcqQBQ47cD3J/nOxIgvjvweB73JDCHKRmNE9fVVdjC4ixsK8O7b3sEjr8miZnKFGDKQNzBWTzEAgFqZgOxsDnkesnpB0+JV/wB4XxArMFdlyYFJvy1RFkUbAbsRwap7PjQgivSuw97gNNp0Uih2/rcY4QCwHH34+CT9yNPhGiW1mbyZEbLpXLLYGLaAGOQ3tYMABtDH2FgUCRMvA2RCwXKACDtC6hVUG7BNPR+6R+P0nrg6V2/hK+T2P6QDDaEXv2flDj868/wvK5XVlbe672KsCrA7CWfxAw7HsDY9xV8gUyKS4xjOjovO52pCRfYEbq4Aqv4z1ecIRVH9IumBfaVbF2+6pK6UbV5/hY+gXGFvLlWyxAxY3QAc2CwuivLADuDz27h0mNcbl0zUpJFeQttN8nzbTVd/eqnoDgX2l9LhW+bH0g4da2V3FuhQWPqXRirHMHK8bWRKO5iB9167Fe9fdPysg6dzt8XTgkUSMmA0GBB5GXvX8a+mxqMKVxdzPGAXBkvc+SbiEbBB12qdfMG3BgCu0IzAHgAhW+8Ks8epix128IG3eXvSEEG+78k8ij7TfGHH7SfBT/X/AGjHbUlDnyWlotG2RC2NsRWtxZjsNkkBSD5u1H8e1ipida1Qw5GS9xUCitEEsUYiyOOwHHsR2Mc8FY7odOmzNf7C18zvW/0uczN/cfoEjmi7yi+9ZOHXgi9oPyZvnxxt59+OOOfSwnMovsarsT63dWADX8/rNJdOsqdOIXOs7lFjco0aFmHqIam8M+YE8Vx6jheF+ntHND13HiIDWtqrArY3eYkKdp89H19OPaI9eGTypifY7Ne4mrABsXzXpMNsD4Tep2upoAqeCSGNWoHYqD+I9CZLER8aPLrXOituDjkY4ygaDckaC+vP6c6XqNT11vDOxHU2GsqQoUlSpDD1+734579psaL40ytiXEgJUuFccs9WpcoOSUCbufcDsDU+daN94IvnuF3cWAAe595tYwiHYh87VTq2TGA1nduHzBAqxRU+8GGwTWG2AWCSNeZ5VuQhiDNjmlucAOABGgPOq53qe+xdCr+haTV6VMuF8mYbewYMWVmJQoWYHgG178cCaPWtXpSy5MWTGQba9w28JZIP+Fr/ABnxhtYCDjzMSBv/APDJFuANu8OORzz/AIeDKY8xGNachrbt381LV3YsKP0m2KMxPc9oAJskXz5+N6rxsZ+lzT4dmFlkByigTWYBp0Gh6ENI1Jo86X1PJqdOcpvKnlFlA62uYueSO4JNgethoj1bpSZwcw1Hhrjxl6+/vBNuQd3bhe3HHzng8upTZ97J45DBqakVS25BQ5BBOTjtyKqTj1mUY9u9iPYlvnwOe3Jg4XBc4ACna6b5jvZ7tKrQ2VLFfp8w4RkmLnMaG6gUGVVVzcDrZNkUDsvQ9E0SYXGRsgDUzAJTOSKNMrbSAfNyCfunuOTq/FHxBj1uKwjeJjs0EBVaUlj4m70G7+77dp4h9fmcBfFcKvZAzBe1AgA/jHOkdVy4MeXEPMuRGSm3ELuBDFRuABNjmj2H45SZw3qfDx5c9E78PA921A76nl8vOtLNEg9y85q6LEiqJJ7e/Ik6TKVUjbdn9zjtf3kPsI5qun5Mh3NkBY9ybJPtZ9eJTH09wpFrZ7Hnj8JxsjZaWR5RX3TYI8JHsW+80CP7rFbNUPS+wirapQaLVf8ACEHTczNuOXkm75u+Obr5QuXoOTIDlD4+cnhtva2OQrvLUFsqeew9a55MDcwBPSyT0G/kOfOtgi9jWW92g96p3WdP04bjNioqjff/AGkVv2vnIh9L/wDzzV5EV0yabawsbswBr5iuJ085rmAay2V6IwbyLDPMfynFxyfDlgZIns2sBCoUllSS0vjE612VDdZVFhsq8d5XEsNoEaogC/OXUJ85OydtMW04CjKyVwIuriGzJx2gsY5gsUuo2rFxDaGrNwTwvS+5uSLhSo1ptMatV28THvma2ucbTMUd4GEp3gLWOIVIOEQOTVe0Vyux9YwBSuITGV1HrLY9UADM84pYYpYBRcSmjqvnBnN+9FPCnHFOoIWVbV4let1Gu18wvTum4je5V7D0HpFWxGG02EyczQ5hFrXgZjHO11X2KdR0LAAWAAN8G+34Smbo67CwyvxXl3cfel82E7ZZ9Oxx36V/ODCsde5O/wBvRasVioWW50bRYrkNSe7e1m6HoAG5lysDtb7te3AJPpdRHUYsxvc45FE0ATzfebWmxHafxmdnxmaI3Gst8z6clDEYgthj4YLbsmiaJ60km6G3hh/EBJJG3YewA5u/nAtpnAoEfnPS6bEfs/8AnMyMiczntbdAch9kmNYyMRlgrM0E9/vw7FlPpnqyy/iT/SJsSP8AvPQ+HYr5zT+IegriTGwH3u/HrURsBNnovImxrIntYRq668F4g52+cj7SfnNXX4BuHHoJfD05SJHIStD8SyPdZH21vb+M77b+7+n/AOzV+xLfaMppMYTJ5efJR9uRf5ykcBca20J+gtU/cDLmCwPtv7o/I/1nT3XSdNpvCXelt5r4/eNfpJmXM7oV60eCD2B3FaLFpoPIDSgM4uZsXlFF3QmNonuMuhM4hcm8r8SmN6izvJxtOpda0BnEkakRINJBiEBOCQmdRqbEXTJB5GlAYcoQJNpl8knT5Ki7NJxNBQCNlH1DxIHmEzNFlbmcFxOqcucIIkzg05FHqGxp5SYmHMZXIdpnBKVBUSpEH4kg5JxR0VyI505QbmezxnRZaBkpryFaMGQJmko2oAGLt6z0nTOnh+m6hx3UkD6UtzymbIdtfOe26Px0fVHn+8f0X+kOFBDtOv3IUv1tzXRGxsL8Qx5XkuloNr/Rv4TD1i8TV0Walb5iZWtfgfWVZ07T6I4twMULegK2OlqPsv8Amb9KmDql7TZ6c/8Auv8Amb+Ux87do774n/Fvqq/qDriw4/2BRpRd/hPbfH6D7HomUcv5j8/If6zxOh7/AJT3Px2P9x6f70eP8sLCdff9JXz+MY0vYSNRt/3j/wAL5r1kUy/4RK6AsfWF6wOV/wAIl+l4rqSaCqYxwDPfRV28kR4AeHl+mM/rAalaYy+7yuPdVmjDnLJr0d5tKrF8UA7gtjpBHhL2/vf9RnTM0WQ7B+P8TOnnFhtfS4fGZImNy7ADfs7lpVI2yZ00WvHUVCKJE6EFcqustjWdOnEoc0YiCM6dOTIOSUDTp0KXmpLScZkzpxRCHmbiAVuZ06cESi75bdInQLlwaMBuJ06FBCuRc6dAuVS0Y07cGdOiSbK0HzhQ7cT12lzbek5lv7zV/L/4zp0eAe/ELH+qG2tHbX1a4LyOJqBiGsPE6dOYqznRvcndDk/2IH1/iJnar0nToCfiPh9grYo22O/7R6KmlPM918bMTo9FfoD/AA+v9ZE6aGjT30K8DFk8aMd//pq+e9UFkfSP9GxihJnSYQ/UCciFrh52+sXf+U6dG/qWzB/6De5VVp06dJUtg2X/2Q==',
  },
  {
    id: 2,
    title: 'Da lat 2',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqJEFpUwwITRXdy-BEz6PIUN_7kWnRqabUBg&usqp=CAU',
  },
  {
    id: 3,
    title: 'Da lat 3',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0k62zD_yOFSiWKYv1-leiFdcBy7jB8XmOvA&usqp=CAU',
  },
  {
    id: 4,
    title: 'Da lat 4',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmMtFUtMEtkmcydnEDS0mBHDXrcv0vxTIM1Q&usqp=CAU',
  },
  {
    id: 5,
    title: 'Da lat 5',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbLSTDPwWYdlkbtn-N1Mq7ZoHsBZR7aXLjvw&usqp=CAU',
  },
  {
    id: 6,
    title: 'Da lat 6',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ57_sR8k1kx2dvfxe9U-nwU1kMZGxzKuND9w&usqp=CAU',
  },
  {
    id: 7,
    title: 'Da lat 7',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ57_sR8k1kx2dvfxe9U-nwU1kMZGxzKuND9w&usqp=CAU',
  },
  {
    id: 8,
    title: 'Da lat 8',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ57_sR8k1kx2dvfxe9U-nwU1kMZGxzKuND9w&usqp=CAU',
  },
  {
    id: 9,
    title: 'Da lat 9',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ57_sR8k1kx2dvfxe9U-nwU1kMZGxzKuND9w&usqp=CAU',
  },
];

const TestAnimated1 = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const IMAGE_SIZE = 80;
  const SPACING = 10;
  const topRef: any = useRef();
  const thumRef: any = useRef();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
    topRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (SPACING + IMAGE_SIZE) - IMAGE_SIZE / 2 > width / 2) {
      thumRef.current?.scrollToOffset({
        offset: index * (SPACING + IMAGE_SIZE) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header headerTitle="TestAnimated" rightCol={false} leftCol={false} />
      <FlatList
        ref={topRef}
        data={dataImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          scrollToIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.url }}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.title}
      />
      <FlatList
        ref={thumRef}
        data={dataImage}
        horizontal
        style={{ position: 'absolute', top: IMAGE_SIZE }}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              _pressed={{ opacity: 0.5 }}
              onPress={() => {
                scrollToIndex(index);
              }}
            >
              <Image
                source={{ uri: item.url }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? '#fff' : 'transparent',
                }}
              />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default TestAnimated1;
