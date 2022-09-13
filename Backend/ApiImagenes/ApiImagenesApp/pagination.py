from rest_framework import pagination

class StandardResultsSetPagination(pagination.PageNumberPagination):
    ##GET https://api.example.org/accounts/?page=4?count=2
    page_size = 6  # tamaño de la pagina
    page_size_query_param = 'page_size' ## tamaño de la consulta , cuantos se quieren en cada pagina
    max_page_size = 10  # numero maximo por pagina 