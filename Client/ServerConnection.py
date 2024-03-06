import requests

import requests


class ServerConnection:
    BASE_URL = 'http://localhost:3000'

    def get_cities(self):
        """Obtiene la lista de ciudades del servidor."""
        response = requests.get(f'{self.BASE_URL}/getCities')
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception("Error al obtener las ciudades del servidor")

    def get_route(self, origin, destination):
        """Obtiene la ruta más eficiente entre dos ciudades."""
        response = requests.post(f'{self.BASE_URL}/calculate-route', json={'origin': origin, 'destination': destination})
        if response.status_code == 200:
            # Asume que el servidor devuelve una lista de nombres de ciudades en la ruta
            return response.json()
        else:
            raise Exception("Error al obtener la ruta del servidor")
